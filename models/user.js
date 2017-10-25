var mongoose = require('mongoose');
mongoose.promise = global.Promise;
var Schema = mongoose.Schema;
const fs = require('fs');
const multer = require('multer');
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

const passwordValidators = [{
  validator: passwordShortLengthChecker,
  message: 'Password must be at least 5 characters'}
  ]

var studentSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    fullname: {type: String, required: true, lowercase: true},
    password: {type: String, required: true, validate: passwordValidators},
    isStudent: {type: Boolean, required: false },
    isTeacher: {type: Boolean, required: false},
    ratings:[{
      kRatings: Number,
      pRatings:  Number,
      taRatings: Number,
      text: String,
      author: String
    }],
    avgRatingArray: [Number],
    avgRatingNumber: Number,
    experiences: [String],
    location: String,
    county: String,
    yrsExperience: String,
    skill1: String,
    skill2: String,
    skill3: String,
    handicap: String,
    cost: String,
    bio: String,
    video: String,
    profPic: String,
    monM: {type: Boolean, required: false },
    monA: {type: Boolean, required: false },
    monE: {type: Boolean, required: false },
    tueM: {type: Boolean, required: false },
    tueA: {type: Boolean, required: false },
    tueE: {type: Boolean, required: false },
    wedM: {type: Boolean, required: false },
    wedA: {type: Boolean, required: false },
    wedE: {type: Boolean, required: false },
    thuM: {type: Boolean, required: false },
    thuA: {type: Boolean, required: false },
    thuE: {type: Boolean, required: false },
    friM: {type: Boolean, required: false },
    friA: {type: Boolean, required: false },
    friE: {type: Boolean, required: false },
    satM: {type: Boolean, required: false },
    satA: {type: Boolean, required: false },
    satE: {type: Boolean, required: false },
    sunM: {type: Boolean, required: false },
    sunA: {type: Boolean, required: false },
    sunE: {type: Boolean, required: false }
  });

  studentSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
      this.password = hash;
      next();
    })
  })

  studentSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

module.exports = mongoose.model('User', studentSchema )
