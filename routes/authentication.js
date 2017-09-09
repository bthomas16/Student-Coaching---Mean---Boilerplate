const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../config/db');

router.post('/register', (req, res) => {
  if(!req.body.email){
    res.json({success: false, message: 'You must provide an email'});
  } else {
    if(!req.body.fullname) {
      res.json({success: false, message: 'You must provide a name'});
    } else {
      if(!req.body.password) {
        res.json({success: false, message: 'You must provide a password'});
      } else {
        let user = new User({
          email: req.body.email.toLowerCase(),
          fullname: req.body.fullname.toLowerCase(),
          password: req.body.password,
          isStudent: req.body.isStudent,
          isTeacher: req.body.isTeacher
        });
        user.save((err) => {
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
            return res.json({success: false, message: 'Could not save user. Error: ', err});
            }
          }
        } else {
          const token = jwt.sign({
            userId: user._id
          }, config.secret, { expiresIn: '24h'});
          res.json({ success: true, message: 'User Registered!', token: token, user: { fullname: user.fullname, email: user.email, isStudent: user.isStudent, isTeacher: user.isTeacher, profPic: user.profPic}});
            }
          });
        }
      }
    }
  });

router.get('/register/check-email/:email', (req, res) => {
  if(!req.params.email) {
    res.json({ succes: false, message: "E-mail was not provided"});
  } else {
    console.log('should save')
    User.findOne({ email: req.params.email}, (err, user) => {
      if(err) {
        res.json({ succes: false, message: err})
      } else {
        if (user) {
          res.json({ success: false, message: "This email is already taken"})
        } else {
          res.json({ success: true, message: "Email is available"})
        }
      }
    });
  }
});

router.post('/login', (req, res) => {
  if (!req.body.email) {
    res.json({ succes: false, message: "No email was provided"})
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: "No password was provided"})
    } else {
      User.findOne({ email: req.body.email.toLowerCase()}, (err, user) => {
        if(err) {
          res.json({ success: false, message: err})
        } else {
          if(!user) {
            res.json({ success: false, message: 'Email not found'})
          } else {
            const validPassword = user.comparePassword(req.body.password);
            if(!validPassword) {
              res.json({ success: false, message: "Password is invalid"})
            } else {
              const token = jwt.sign({
                userId: user._id
              }, config.secret, { expiresIn: '24h'});
              res.json({ success: true, message: "Success!", token: token, user: { fullname: user.fullname, email: user.email, isStudent: user.isStudent, isTeacher: user.isTeacher, profPic: user.profPic}});
            }
          }
        }
      });
    }
  }
});


// Any routes below this middleware will require authentication / headers
router.use((req, res, next)=> {
  const token = req.headers['authorization']
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

router.get('/profile', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('email fullname isStudent isTeacher').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found'});
      } else {
        res.json({ success: true, user: user});
      }
    }
  });
});

router.get('/profile/is-student', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('isStudent').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found'});
      } else {
        if(user.isStudent == false) {
          res.json({ success: false, message: 'User does not have Student permissions'})
        } else {
          res.json({ success: true, user: user});
        }
      }
    }
  });
});

router.get('/profile/is-teacher', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('isTeacher').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found'});
      } else {
        if(user.isTeacher == false) {
          res.json({ success: false, message: 'User does not have Teacher permissions'})
        } else {
          res.json({ success: true, user: user});
        }
      }
    }
  });
});

router.put('/become-student', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
        user.isStudent = req.body.isStudent
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
              res.json({ success: true, message: 'You are now a Student'})
          }
        })
    }
  }
});
});

router.put('/become-teacher', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
        user.isTeacher = req.body.isTeacher
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
              res.json({ success: true, message: 'You are now a Teacher'})
          }
        })
    }
  }
});
});

router.put('/update-schedule', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
        user.monM = req.body.monM,
        user.monA = req.body.monA,
        user.monE = req.body.monE,
        user.tueM = req.body.tueM,
        user.tueA = req.body.tueA,
        user.tueE = req.body.tueE,
        user.wedM = req.body.wedM,
        user.wedA = req.body.wedA,
        user.wedE = req.body.wedE,
        user.thuM = req.body.thuM,
        user.thuA = req.body.thuA,
        user.thuE = req.body.thuE,
        user.friM = req.body.friM,
        user.friA = req.body.friA,
        user.friE = req.body.friE,
        user.satM = req.body.satM,
        user.satA = req.body.satA,
        user.satE = req.body.satE,
        user.sunM = req.body.sunM,
        user.sunA = req.body.sunA,
        user.sunE = req.body.sunE
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
              res.json({ success: true, message: 'Availability Updated'})
          }
        })
    }
  }
});
});

router.put('/teacher-rating', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
      user.ratingsArray = req.body.ratingsArray;
      user.save((err) => {
        if(err) {
          res.json({ succes: false, message: err})
        } else {
            res.json({ success: true, message: 'Rating Submitted'})
          }
        });
      }
    }
  });
});

router.get('/get-schedule', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('monM monA monE tueM tueA tueE wedM wedA wedE thuM thuA thuE friM friA friE satM satA satE sunM sunA sunE').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found'});
      } else {
        res.json({ success: true, user: user});
      }
    }
  });
});

router.get('/teacher-rating', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('ratingsArray').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found'});
      } else {
        res.json({ success: true, user: user});
      }
    }
  });
});



module.exports = (router)
