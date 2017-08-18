const Student = require('../models/student');
module.exports = (router) => {


router.post('/student/register', (req, res) => {
  if(!req.body.email){
    res.json({success: false, message: 'You must provide an email'});
  } else {
    if(!req.body.firstname) {
      res.json({success: false, message: 'You must provide a first name'});
    } else {
      if(!req.body.password) {
        res.json({success: false, message: 'You must provide a password'});
      } else {
        let student = new Student({
          email: req.body.email.toLowerCase(),
          firstname: req.body.firstname.toLowerCase(),
          password: req.body.password
        });
        student.save((err) => {
          if(err) {
            if(err.code === 11000) {
              res.json({success: false, message: 'An account with this email address already exists'});
            } else {
              if (err.errors) {
                if(err.errors.email) {
                  return res.json({success: false, message: err.errors.email.message});
                } else {
                  if (err.errors.firstname) {
                    return res.json({success: false, message: err.errors.firstname.message})
                  } else {
                    if (err.errors.password) {
                    return res.json({success: false, message: err.errors.password.message});
                  }
                }
              }
            return res.json({success: false, message: 'Could not save student. Error: ', err});
            }
          }
        } else {
            return res.json({success: true, message: 'Student Registered!'});
            }
          })
        }
      }
    }
  })

router.get('/student/register/check-email/:email', (req, res) => {
  if(!req.params.email) {
    res.json({ succes: false, message: "E-mail was not provided"});
  } else {
    Student.findOne({ email: req.params.email}, (err, student) => {
      if(err) {
        res.json({ succes: false, message: err})
      } else {
        if (student) {
          res.json({ success: false, message: "This email is already taken"})
        } else {
          res.json({ success: true, message: "Email is available"})
        }
      }
    })
  }
})




return router
};
