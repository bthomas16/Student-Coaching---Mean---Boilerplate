var mongoose = require('mongoose');
mongoose.promise = global.Promise;
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailShortLengthChecker = (email) => {
  if (!email) {
    return false;
  } else {
    if (email.length < 5) {
    return false;
    } else {
      return true;
    }
  }
};

let emailLongLengthChecker = (email) => {
  if (!email) {
    return false;
  } else {
    if (email.length > 30) {
    return false;
    } else {
      return true;
    }
  }
};

let validEmailChecker = (email) => {
  if(!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email)
  }
}

let validFirstname = (firstname) => {
  // Check if firstname exists
  if (!firstname) {
    return false; // Return error
  } else {
    // Regular expression to test if firstname format is valid
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    return regExp.test(firstname); // Return regular expression test result (true or false)
  }
};

let passwordShortLengthChecker = (password) => {
  if(!password) {
      return false;
  } else {
    if(password.length < 5) {
      return false;
    } else {
      return true;
    }
  }
}

// Must contain 1 letter and 1 number
// validPassword = (password) => {
//   if(!password) {
//     return false;
//   } else {
//       const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
//       return regExp.test(password);
//   }
// }


const emailValidators = [
  { validator: emailShortLengthChecker, message: 'Email must be greater than 5 characters' },
  { validator: validEmailChecker, message: "Must enter a valid email"}
]

const firstnameValidators = [
  {validator: validFirstname, message: 'First name may only contain regular characters'}
]

const passwordValidators = [{
  validator: passwordShortLengthChecker,
  message: 'Password must be at least 5 characters'}
  ]

var studentSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    firstname: {type: String, required: true, lowercase: true, validate: firstnameValidators},
    password: {type: String, required: true, validate: passwordValidators}
  });

  studentSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
      this.password = hash;
      next();
    })
  })

  studentSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  }

module.exports = mongoose.model('Student', studentSchema )
