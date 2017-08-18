const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  //Change number 27017 with relevant ./mongod server number
  url: 'mongodb://localhost:27017/mean-boilerplate',
  secret: crypto,
  db: 'mean-boilerplate'
}
