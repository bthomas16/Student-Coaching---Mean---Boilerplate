var mongoose = require('mongoose');
mongoose.promise = global.Promise;
var Schema = mongoose.Schema;

// let emailShortLengthChecker = (email) => {
//   if (!email) {
//     return false;
//   } else {
//     if (email.length < 5) {
//     return false;
//     } else {
//       return true;
//     }
//   }
// };
//
// let emailLongLengthChecker = (email) => {
//   if (!email) {
//     return false;
//   } else {
//     if (email.length > 30) {
//     return false;
//     } else {
//       return true;
//     }
//   }
// };
//
// let validEmailChecker = (email) => {
//   if(!email) {
//     return false;
//   } else {
//     const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//     return regExp.test(email)
//   }
// }


// const emailValidators = [
//   { validator: emailShortLengthChecker, message: 'Email must be greater than 5 characters' },
//   { validator: emailLongLengthChecker, message: 'Email must be less than 30 characters' },
//   { validator: validEmailChecker, message: "Must enter a valid email"}
// ]

var wantToLearnSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    skillToLearn: {type: String, required: true}
  });

module.exports = mongoose.model('wantToLearn', wantToLearnSchema )
