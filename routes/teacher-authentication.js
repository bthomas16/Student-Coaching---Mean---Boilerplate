const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../config/db');


router.post('/teacher/register', (req, res) => {
  if(!req.body.email){
    res.json({success: false, message: 'You must provide an email'});
  } else {
    if(!req.body.fullname) {
      res.json({success: false, message: 'You must provide a first name'});
    } else {
      if(!req.body.password) {
        res.json({success: false, message: 'You must provide a password'});
      } else {
        let teacher = new Teacher({
          email: req.body.email.toLowerCase(),
          fullname: req.body.fullname.toLowerCase(),
          password: req.body.password
        });
        teacher.save((err) => {
          if(err) {
            if(err.code === 11000) {
              res.json({success: false, message: 'An account with this email address already exists'});
            } else {
              if (err.errors) {
                if(err.errors.email) {
                  return res.json({success: false, message: err.errors.email.message});
                } else {
                  if (err.errors.fullname) {
                    return res.json({success: false, message: err.errors.fullname.message})
                  } else {
                    if (err.errors.password) {
                    return res.json({success: false, message: err.errors.password.message});
                  }
                }
              }
            return res.json({success: false, message: 'Could not save teacher. Error: ', err});
            }
          }
        } else {
            return res.json({success: true, message: 'Teacher Registered!'});
            }
          })
        }
      }
    }
  })

router.get('/teacher/register/check-email/:email', (req, res) => {
  if(!req.params.email) {
    res.json({ succes: false, message: "E-mail was not provided"});
  } else {
    Teacher.findOne({ email: req.params.email}, (err, teacher) => {
      if(err) {
        res.json({ succes: false, message: err})
      } else {
        if (teacher) {
          res.json({ success: false, message: "This email is already taken"})
        } else {
          res.json({ success: true, message: "Email is available"})
        }
      }
    })
  }
})

router.post('/teacher/login', (req, res) => {
  if (!req.body.email) {
    res.json({ succes: false, message: "No email was provided"})
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: "No password was provided"})
    } else {
      Teacher.findOne({ email: req.body.email.toLowerCase()}, (err, teacher) => {
        if(err) {
          res.json({ success: false, message: err})
        } else {
          if(!teacher) {
            res.json({ success: false, message: 'Email not found'})
          } else {
            const validPassword = teacher.comparePassword(req.body.password);
            if(!validPassword) {
              res.json({ success: false, message: "Password is invalid"})
            } else {
              const token = jwt.sign({
                teacherId: teacher._id
              }, config.secret, { expiresIn: '24h'});
              res.json({ success: true, message: "Success!", token: token, teacher: { fullname: teacher.fullname, email: teacher.email }});
            }
          }
        }
      })
    }
  }
})


// Any routes below this middleware will require authentication / headers
router.use((req, res, next)=> {
  const token = req.headers['teacher-authorization']
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

router.get('/teacher/profile', (req, res) => {
  Teacher.findOne({ _id: req.decoded.teacherId }).select('email fullname').exec((err, teacher) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!teacher) {
        res.json({ success: false, message: 'Teacher not found'});
      } else {
        res.json({ success: true, teacher: teacher});
      }
    }
  })
})


module.exports = (router);
