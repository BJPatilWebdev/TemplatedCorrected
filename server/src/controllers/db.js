// const mysql = require('mysql/promise');
const mysql = require('mysql2');
const path = require("path");

const dotenv = require('dotenv');

// Construct the path to the .env file
const envPath = path.resolve(__dirname, '../.env');
// Load the .env file
dotenv.config({ path: envPath });

const db =
  mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function queryAsync(sql, args) {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports = { db, queryAsync };
