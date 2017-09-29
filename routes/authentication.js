const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const config = require('../config/db');

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
      cb(null, './routes/uploads')
    },
    filename: (req, files, cb) => {
      let ext = path.extname(files.originalname);
      cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  });

const upload = multer({ storage: storage})


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

router.put('/avatar-upload/:id', upload.any(), (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log('route is hit, matie here files', req.files[0]);
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
      if(!req.files) {
        console.log('4')
        res.json({ success: false, message: 'No file was provided'})
      } else {
        console.log('5')
        user.profPicName = req.files[0].filename;
        console.log('this means it workd', user.profPicName)
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
            res.json(req.files.map(file => {
                let ext = path.extname(file.originalname);
                console.log('6')
                  // return {
                return {
              originalName: file.originalname,
              filename: file.filename
              }
          }));
        }
      });
        }
        }
      }
    });
  });

  router.get('/avatar-retrieve/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).select('profPicName').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err});
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found'});
        } else {
          console.log(user.profPicName)
          res.sendFile( __dirname + '/uploads/' + user.profPicName);
        }
      }
    });
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
  User.findOne({ _id: req.decoded.userId }).select().exec((err, user) => {
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

// Photo Upload
// router.use(multer({ dest: '../uploads/', rename: function(fieldname, filename){
//   return filename
//   },
// }).single('image'));
//
// router.put('/image-upload',function(req,res){
//   console.log('suppers')
//   User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
//     if (err) {
//       res.json({ success: false, message: 'Not a valid user id'});
//     } else {
//         if(!user) {
//           res.json({ success: false, message: 'No User found'});
//     } else {
//      user.img.data = fs.readFileSync(req.files.image.path)
//      user.img.contentType = 'image/png';
//      console.log('about to save', user.img)
//      user.img.save((err) => {
//        if(err) {
//          res.json({ succes: false, message: err})
//       } else {
//         console.log('saved')
//        res.json({ success: true, message: 'Photo Uploaded'})
//       }
//     });
//   }
// }
//   });
//   });

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
      user.kRatingsArray = req.body.kRatingsArray;
      user.pRatingsArray = req.body.pRatingsArray;
      user.taRatingsArray = req.body.taRatingsArray;
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
  User.findOne({ _id: req.decoded.userId }).select('kRatingsArray pRatingsArray taRatingsArray').exec((err, user) => {
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

router.get('/view-teacher-profile/:id', (req,res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
  if(!req.params.id) {
    res.json({ success: false, message: 'No Teacher ID was provided'});
  } else {
    User.findOne({ _id: req.params.id}).exec((err, teacher) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid teacher ID'});
    } else {
      if (!teacher) {
        res.json({ success: false, message: 'Teacher not found'});
      } else {
        res.json({ success: true, teacher: teacher});
        }
      }
    });
  }
}
}
});
});

router.get('/get-featured-teacher', (req, res) => {
    User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
      if (err) {
        res.json({ success: false, message: 'Not a valid user id'});
      } else {
          if(!user) {
            res.json({ success: false, message: 'No User found'});
      } else {

    User.find({isTeacher: 'true', experience3: {'$ne': null }, handicap: {'$ne': null }, location: {'$ne': null }, bio: {'$ne': null }, skills: {'$ne': null }}, (err, teachers) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (teachers.length === 0) {
          res.json({ success: false, message: 'No teachers found' });
        } else {
          const featuredTeacher = Math.floor((Math.random() * (teachers.length - 1)) + 1);
          console.log('We made it here!', featuredTeacher)
          res.json({ success: true, teacher: teachers[featuredTeacher] });
        }
      }
    });
    }
    }
  });// Sort teachers from newest to oldest
  });



router.put('/experience', (req,res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
        user.experience1 = req.body.experience1,
        user.experience2 = req.body.experience2,
        user.experience3 = req.body.experience3,
        user.experience4 = req.body.experience4,
        user.experience5 = req.body.experience5
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
            console.log('working', user)
              res.json({ success: true, message: 'Experiences Saved'})
            }
          });
        }
      }
    });
  });

  router.put('/info', (req,res) => {
    User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
      if (err) {
        res.json({ success: false, message: 'Not a valid user id'});
      } else {
          if(!user) {
            res.json({ success: false, message: 'No User found'});
      } else {
          user.location = req.body.location,
          user.yrsExperience = req.body.yrsExperience,
          user.skills = req.body.skills,
          user.handicap = req.body.handicap,
          user.cost = req.body.cost
          console.log('user', user)
          user.save((err) => {
            if(err) {
              res.json({ succes: false, message: err})
            } else {
              console.log('working', user)
                res.json({ success: true, message: 'Experiences Saved'})
              }
            });
          }
        }
      });
    });

    router.put('/video', (req,res) => {
      User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid user id'});
        } else {
            if(!user) {
              res.json({ success: false, message: 'No User found'});
        } else {
            user.video = req.body.video,
            console.log('userVideo is:', user.video)
            user.save((err) => {
              if(err) {
                res.json({ succes: false, message: err})
              } else {
                console.log('working', user)
                  res.json({ success: true, message: 'Video Saved'})
                }
              });
            }
          }
        });
      });

      router.put('/updated-teacher-bio', (req,res) => {
        User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
          if (err) {
            res.json({ success: false, message: 'Not a valid user id'});
          } else {
              if(!user) {
                res.json({ success: false, message: 'No User found'});
          } else {
              user.bio = req.body.bio,
              console.log('userBio is:', user.bio)
              user.save((err) => {
                if(err) {
                  res.json({ succes: false, message: err})
                } else {
                  console.log('working', user)
                    res.json({ success: true, message: 'Video Saved'})
                  }
                });
              }
            }
          });
        });





// FILES UPLOADS

router.post('/avatar-upload/:id', upload.any(), (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log('route is hit, matie here files', req.files, "or singular:", req.file, 'and the body:', req.body);

  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
      if(!req.files) {
        console.log('4')
        res.json({ success: false, message: 'No file was provided'})
      } else {
        console.log('5')
        res.json(req.files.map(file => {
          let ext = path.extname(file.originalname);
          console.log('6')
            return {
        originalName: file.originalname,
        filename: file.filename
      }
    }));
      }
    }
  }
  });
});



// router.post('/avatar-upload', upload.any(), (req, res) => {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log('route is hit, matie', req.files)
//   // User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
//   //   if (err) {
//   //     res.json({ success: false, message: 'Not a valid user id'});
//   //   } else {
//   //       if(!user) {
//   //         res.json({ success: false, message: 'No User found'});
//   //   } else {
//       if(!req.files) {
//         console.log('fail')
//         res.json({ success: false, message: 'No file was provided'})
//       } else {
//         console.log('success')
//         res.json(req.files.map(file => {
//           let ext = path.extname(file.originalname);
//             return {
//         originalName: file.originalname,
//         filename: file.filename
//       }
//     }));
//       }
//   //   }
//   // }
//   });
// // });
//




module.exports = (router)
