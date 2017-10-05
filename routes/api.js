const User = require('../models/user');
const emailSubscriber = require('../models/email-subscriber')
const jwt = require('jsonwebtoken');
const express = require('express');
// const multer = require('multer');
const path = require('path');
const router = express.Router();
const config = require('../config/db');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './routes/uploads')
//     },
//     filename: (req, file, cb) => {
//       let ext = path.extname(file.originalname);
//       cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
//     }
//   });
//
// const upload = multer({ storage: storage})

router.get('/get-all-teachers', (req, res) => {
    // Search database for all blog posts
    User.find({isTeacher: 'true', experience3: {'$ne': null }, handicap: {'$ne': null }, location: {'$ne': null }, bio: {'$ne': null }, skills: {'$ne': null }},  (err, teachers) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if teachers were found in database
        if (teachers.length === 0) {
          res.json({ success: false, message: 'No teachers found' }); // Return error of no teachers found
        } else {
          res.json({ success: true, teachers: teachers }); // Return success and teachers array
        }
      }
    })
  });

  router.post('/email-subscriber', (req, res) => {
    console.log('hit me!', req.body.email)
    if(!req.body.email){
      res.json({success: false, message: 'You must provide an email'});
    } else {
      let emailSubscribers = new emailSubscriber({
        email: req.body.email.toLowerCase()
      });
      emailSubscribers.save((err) => {
        if(err) {
          if(err.code === 11000) {
            res.json({success: false, message: "This email is already waiting for the newest updates!"});
          } else {
            if (err.errors) {
              if(err.errors.email) {
                return res.json({success: false, message: err.errors.email.message});
            }
            return res.json({success: false, message: 'Could not subscrite at this time. Please try again later. Error: ', err});
          }
        }
      } else {
        res.json({ success: true, message: 'Successfully Subscribed!'});
      }
    })
  }
});

router.get('/check-subscriber-email/:emailSubscriber', (req, res) => {
  if(!req.params.emailSubscriber) {
    res.json({ succes: false, message: "E-mail was not provided"});
  } else {
    emailSubscriber.findOne({ emailSubscriber: req.params.emailSubscriber}, (err, emailSubscriber) => {
      if(err) {
        res.json({ succes: false, message: err})
      } else {
        if (emailSubscriber) {
          res.json({ success: false, message: "This email is already subscribed"})
        } else {
          res.json({ success: true, message: "You are ready to receive some awesome updates!"})
        }
      }
    })
  }
})

// router.post('/avatar-upload', upload.any(), (req, res) => {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   console.log('route is hit, matie', req.files.id);
//   User.findOne({ _id: req.files.id }).exec((err, user) => {
//     if (err) {
//       console.log('1')
//       res.json({ success: false, message: 'Not a valid user id'});
//     } else {
//       console.log('2')
//         if(!user) {
//           res.json({ success: false, message: 'No User found'});
//     } else {
//       console.log('3')
//       if(!req.files) {
//         console.log('4')
//         res.json({ success: false, message: 'No file was provided'})
//       } else {
//         console.log('5')
//         res.json(req.files.map(file => {
//           let ext = path.extname(file.originalname);
//           console.log('6')
//             return {
//         originalName: file.originalname,
//         filename: file.filename
//       }
//     }));
//       }
//     }
//   }
//   });
// });
//
// router.get('/avatar-retrieve', (req, res) => {
//   res.sendFile( __dirname + '/uploads/50wn1k.jpeg');
// })


module.exports = (router);
