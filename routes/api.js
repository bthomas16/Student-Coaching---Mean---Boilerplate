// const jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();
// const config = require('../config/db');
//
// router.get('/get-all-teachers', (req, res) => {
//     // Search database for all blog posts
//     Teacher.find({}, (err, teachers) => {
//       // Check if error was found or not
//       if (err) {
//         res.json({ success: false, message: err }); // Return error message
//       } else {
//         // Check if teachers were found in database
//         if (teachers.length === 0) {
//           res.json({ success: false, message: 'No teachers found' }); // Return error of no teachers found
//         } else {
//           res.json({ success: true, teachers: teachers }); // Return success and teachers array
//         }
//       }
//     }).sort({ '_id': -1 }); // Sort teachers from newest to oldest
//   });
//
// module.exports = (router);
