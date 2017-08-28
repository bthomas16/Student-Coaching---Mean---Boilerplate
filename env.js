const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = "mongodb://test:test@ds161483.mlab.com:61483/skill-site"; // Databse URI and database name
  process.env.databaseName = 'production database: skill-site'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://localhost:27017/mean-boilerplate'; // Databse URI and database name
  process.env.databaseName = 'development database: mean-boilerplate'; // Database name
}
