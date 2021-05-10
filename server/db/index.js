const mysql = require('mysql2');
const Promise = require('bluebird');

// module.exports = () => {
const createTables = require('./table-config');

const database = 'SDC';

const connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))

module.exports = db;
