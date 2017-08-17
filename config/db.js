const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  //Change number 27017 with relevant ./mongod server number
  uri: 'mongodb://localhost/27017/' + this.db,
  secret: crypto,
  db: 'mean-boilerplate'
}
