const crypto = require('crypto').randomBytes(256).toString('hex');

// const server =  "mongodb://localhost:27017/mean-boilerplate "
const server = "mongodb://test:test@ds161483.mlab.com:61483/skill-site"

module.exports = {
  //Change number 27017 with relevant ./mongod server number
  url: server,
  secret: crypto,
  db: 'mean-boilerplate'
}
