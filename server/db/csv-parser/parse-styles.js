const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql2');
const Promise = require('bluebird');

const csvFilePath = './server/db/data/styles.csv';
const createTables = require('../table-config');

const database = 'SDC';
const table = 'Styles';

const connection = mysql.createPool({
  connectionLimit: 10,
  user: 'root',
  password: 'password',
  database,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.getConnectionAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => db.queryAsync(`DROP TABLE IF EXISTS ${table}`))
  .then(() => createTables(db))
  .then(() => {
    const stream = fs.createReadStream(csvFilePath);
    const csvData = [];
    let count = 0;
    const csvStream = fastcsv
      .parse()
      .on('data', (data) => {
        if (data[4][0] === '$') {
          data[4] = data[4].slice(1);
        }
        if (data[3][0] === '$') {
          data[3] = data[3].slice(1);
        }
        if (data[3] === 'null') {
          data[3] = null;
        }
        if (data[0] !== 'id' && data.length === 6) {
          csvData.push(data);
          count++;
        }
        if (count % 50000 === 0) {
          console.log(count);
        }
      })
      .on('end', () => {
        for (let i = 0; i < csvData.length; i += 100000) {
          db.queryAsync(`INSERT INTO ${table} (styleID, productID, name, salePrice, originalPrice, defaultStyle) VALUES ?`, [csvData.slice(i, i + 100000 - 1)])
            .then(() => console.log(`Successfully imported! ${i}`))
            .catch((err) => console.log(err));
        }
      });
    stream.pipe(csvStream);
  });
