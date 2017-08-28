const env = require('./env');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/db')
const path = require('path');
const authentication = require('./routes/authentication')
const api = require('./routes/api')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

// app.use(cors({
//   origin:'http://localhost:4200'
// }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, {useMongoClient: true}, (err) => {
  if (err) {
    console.log('Could not connect to DB: ', err);
  } else {
    console.log('Connected to DB:' + config.db);
  }
});



// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.use('/api', api);
app.use('/authentication', authentication);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})



app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
})
