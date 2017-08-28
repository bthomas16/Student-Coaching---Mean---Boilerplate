const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  //Change number 27017 with relevant ./mongod server number
  uri: process.env.databaseUri, // Databse URI and database name
  secret: crypto, // Cryto-created secret
  db: process.env.databaseName // Database name
}
