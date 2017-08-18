const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose');
const config = require('./config/db')
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.url, {useMongoClient: true}, (err) => {
  if (err) {
    console.log('Could not connect to DB: ', err);
  } else {
    console.log('Conencted to DB:' + config.db);
  }
});

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//   next();
// });

app.use(cors({
  origin:'http://localhost:4200'
}));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication)

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})



app.listen(8080, () => {
  console.log('Listening on port 8080');
})
