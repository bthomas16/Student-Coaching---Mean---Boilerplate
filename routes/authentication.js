const User = require('../models/user');
const jwt = require('jsonwebtoken');
const express = require('express');
// const multer = require('multer');
const path = require('path');
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
// Any routes below this middleware will require authentication / headers
// Any routes below this middleware will require authentication / headers
// Any routes below this middleware will require authentication / headers
// Any routes below this middleware will require authentication / headers
// Any routes below this middleware will require authentication / headers
// Any routes below this middleware will require authentication / headers

router.use((req, res, next)=> {
  const token = req.headers['authorization']
  if (!token) {
    res.json({ success: false, message: 'No Token Provided'});
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Your session has expired - Please Logout and Login again.'});
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
  User.findOne({ _id: req.decoded.userId }).exec((err, userRating) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!userRating) {
          res.json({ success: false, message: 'No User is logged in'});
    } else {
      User.findOne({ _id: req.body.beingRatedId }).exec((err, userBeingRated) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid user-to-rate id'});
        } else {
          if(!userBeingRated) {
            res.json({ success: false, message: 'No User will be Rated'});
          } else {
              if(req.decoded.userId === req.body.beingRatedId) {
                res.json({ success: false, message: "You can't rate yourself :("})
              } else {
              userBeingRated.ratings.push({
                kRatings: req.body.kRatings,
                pRatings: req.body.pRatings,
                taRatings: req.body.taRatings,
                text: req.body.text,
                author: req.body.author
              })
              const tempAvg = ((req.body.kRatings + req.body.pRatings + req.body.taRatings)/3)
              userBeingRated.avgRatingArray.push(tempAvg)
              const newAvg = userBeingRated.avgRatingArray.reduce((a, b) => a + b)/userBeingRated.avgRatingArray.length;
              userBeingRated.avgRatingNumber = newAvg;
              userBeingRated.save((err) => {
                if(err) {
                  res.json({ succes: false, message: err})
                } else {
                    res.json({ success: true, message: 'Rating Submitted'})
                  }
                });
                }
              }
            }
            });
          }
        }
      });
    });

router.get('/teacher-rating', (req, res) => {
  User.findOne({ _id: req.decoded.userId }).select('ratings avgRating').exec((err, ratings) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!ratings) {
        res.json({ success: false, message: 'Not yet Rated'});
      } else {
        res.json({ success: true, ratings: ratings});
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
    User.find({isTeacher: 'true', experiences: {'$ne': null }, handicap: {'$ne': null }, county: {'$ne': null }, bio: {'$ne': null }, skill2: {'$ne': null }, profPic: {'$ne': null }, onlineStatus: {'$ne': 'ONLINE' }}, (err, teachers) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (teachers.length === 0) {
          res.json({ success: false, message: 'No teachers found' });
        } else {
          const featuredTeacher = Math.floor((Math.random() * (teachers.length)));
          res.json({ success: true, teacher: teachers[featuredTeacher] });
        }
      }
    });
    }
    }
  });// Sort teachers from newest to oldest
  });



router.put('/experiences', (req,res) => {
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    if (err) {
      res.json({ success: false, message: 'Not a valid user id'});
    } else {
        if(!user) {
          res.json({ success: false, message: 'No User found'});
    } else {
        user.experiences = req.body
        user.save((err) => {
          if(err) {
            res.json({ succes: false, message: err})
          } else {
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
          user.county = req.body.county,
          user.yrsExperience = req.body.yrsExperience,
          user.skill1 = req.body.skill1,
          user.skill2 = req.body.skill2,
          user.skill3 = req.body.skill3,
          user.handicap = req.body.handicap,
          user.cost = req.body.cost
          user.save((err) => {
            if(err) {
              res.json({ succes: false, message: err})
            } else {
                res.json({ success: true, message: 'Experiences Saved'})
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
              user.save((err) => {
                if(err) {
                  res.json({ succes: false, message: err})
                } else {
                    res.json({ success: true, message: 'Video Saved'})
                  }
                });
              }
            }
          });
        });

        router.put('/online-status', (req,res) => {
          User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
            if (err) {
              res.json({ success: false, message: 'Not a valid user id'});
            } else {
                if(!user) {
                  res.json({ success: false, message: 'No User found'});
            } else {
                user.onlineStatus = req.body.status,
                user.save((err) => {
                  if(err) {
                    res.json({ succes: false, message: err})
                  } else {
                      res.json({ success: true, message: 'You are now ' + req.body.status})
                    }
                  });
                }
              }
            });
          });




        // FILE UPLOADS
        // FILE UPLOADS
        // FILE UPLOADS

        const AWS = require('aws-sdk');
        const Busboy = require('busboy');
        const busboy = require('connect-busboy');
        const busboyBodyParser = require('busboy-body-parser');

        const awsBucket = require('../config/aws')

        router.use(busboy());
        router.use(busboyBodyParser());

        function uploadToS3(file) {
          let s3bucket = new AWS.S3({
            accessKeyId: awsBucket.IAM_USER_KEY,
            secretAccessKey: awsBucket.IAM_USER_SECRET,
            Bucket: awsBucket.BUCKET_NAME
          });
          s3bucket.createBucket(function () {
              var params = {
                Bucket: awsBucket.BUCKET_NAME,
                Key: file.name,
                Body: file.data
              };
              s3bucket.upload(params, function (err, data) {
                if (err) {
                  console.log('error in callback');
                  console.log(err);
                }
                console.log('success');
                console.log(data);
              });
          });
        }

        router.post('/upload-photo', function (req, res, next) {
            console.log('hit with the files', req.files, req.body)
            User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
              if (err) {
                res.json({ success: false, message: 'Not a valid user id'});
              } else {
                  if(!user) {
                    res.json({ success: false, message: 'No User found'});
              } else {
              var busboy = new Busboy({ headers: req.headers });
            // The file upload has completed
            busboy.on('finish', function() {
              console.log('Upload finished');

        //  req.files.file:
              // {
              //    file: {
              //      data: ...contents of the file...,
              //      name: 'Example.jpg',
              //      encoding: '7bit',
              //      mimetype: 'image/png',
              //      truncated: false,
              //      size: 959480
              //    }
              // }

              const file = req.files.file;
              console.log(file, 'log me here dude');
              uploadToS3(file);
              });
              req.pipe(busboy);
              user.profPic = req.files.file.name
              user.save((err) => {
                if(err) {
                  res.json({ succes: false, message: err})
                } else {
                  res.json({ success: true, message: 'File Uploaded'})
                }
              });
            }
          }
        });
      });

      router.post('/upload-video', function (req, res, next) {
          console.log('hit with the files', req.files, req.body)
          User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
            if (err) {
              res.json({ success: false, message: 'Not a valid user id'});
            } else {
                if(!user) {
                  res.json({ success: false, message: 'No User found'});
            } else {

          // This grabs the additional parameters so in this case passing in
          // "element1" with a value.
          // const element1 = req.body.element1;

          var busboy = new Busboy({ headers: req.headers });

          // The file upload has completed
          busboy.on('finish', function() {
            console.log('Upload finished');

            // Your files are stored in req.files. In this case,
            // you only have one and it's req.files.element2:
            // This returns:
            // {
            //    file: {
            //      data: ...contents of the file...,
            //      name: 'Example.jpg',
            //      encoding: '7bit',
            //      mimetype: 'image/png',
            //      truncated: false,
            //      size: 959480
            //    }
            // }

            // Grabs your file object from the request.
            const file = req.files.file;
            console.log(file);
            // Begins the upload to the AWS S3
            uploadToS3(file);
          });
          req.pipe(busboy);
          user.profVideo = req.files.file.name
          user.save((err) => {
            if(err) {
              res.json({ succes: false, message: err})
            } else {
                res.json({ success: true, message: 'File Uploaded'})
              }
            });
          }
        }
      });
      });


module.exports = (router)
