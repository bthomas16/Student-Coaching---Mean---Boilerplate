const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

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

router.post('/student/login', (req, res) => {
  if (!req.body.email) {
    res.json({ succes: false, message: "No email was provided"})
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: "No password was provided"})
    } else {
      Student.findOne({ email: req.body.email.toLowerCase()}, (err, student) => {
        if(err) {
          res.json({ success: false, message: err})
        } else {
          if(!student) {
            res.json({ success: false, message: 'Email not found'})
          } else {
            const validPassword = student.comparePassword(req.body.password);
            if(!validPassword) {
              res.json({ success: false, message: "Password is invalid"})
            } else {
              const token = jwt.sign({
                studentId: student._id
              }, config.secret, { expiresIn: '24h'});
              res.json({ success: true, message: "Success!", token: token, student: { firstname: student.firstname, email: student.email }});
            }
          }
        }
      })
    }
  }
})


// Any routes below this middleware will require authentication / headers
router.use((req, res, next)=> {
  const token = req.headers['student-authorization']
  if (!token) {
    res.json({ success: false, message: 'No Token Provided'});
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token Invalid:' + err});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

router.get('/student/profile', (req, res) => {
  Student.findOne({ _id: req.decoded.studentId }).select('email firstname').exec((err, student) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!student) {
        res.json({ success: false, message: 'Student not found'});
      } else {
        res.json({ success: true, student: student});
      }
    }
  })
})




return router
};
