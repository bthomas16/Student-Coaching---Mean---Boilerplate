const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const config = require('../config/db');

router.get('/teachers-retrieve', (req, res) => {
  res.send('hey there');
})

module.exports = router;
