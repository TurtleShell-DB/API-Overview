const mysql = require('mysql2');
const Promise = require('bluebird');

// module.exports = () => {
const createTables = require('./table-config');

const database = 'SDC';

const connection = mysql.createPool({
  host: 'rds-mysql-sdcproducts.cxo4btznuoes.us-east-1.rds.amazonaws.com',
  user: 'humbugger',
  port: 3306,
  password: 'password',
  database,
  multipleStatements: true,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.getConnectionAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))

module.exports = db;
