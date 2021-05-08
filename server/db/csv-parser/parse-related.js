const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql2');
const Promise = require('bluebird');

const csvFilePath = './server/db/data/related.csv';
const createTables = require('../table-config');

const database = 'SDC';

const connection = mysql.createPool({
  user: 'root',
  password: 'password',
  database,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.getConnectionAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))
  .then(() => {
    const stream = fs.createReadStream(csvFilePath);
    const csvData = [];
    let count = 0;
    const csvStream = fastcsv
      .parse()
      .on('data', (data) => {
        if (typeof data[0] === 'NaN') {
          console.log(data[0]);
        } else {
          csvData.push(data);
          count++;
        }
        if (count % 50000 === 0) {
          console.log(count);
        }
      })
      .on('end', () => {
        // remove the first line: header
        csvData.shift();

        // connect to the MySQL database
        // save csvData
        for (let i = 0; i < csvData.length; i += 100000) {
          db.queryAsync('INSERT INTO Related (id, productID1, productID2) VALUES ?', [csvData.slice(i, i + 100000 - 1)])
            .then(() => console.log(`Successfully imported! ${i}`))
            .catch((err) => console.log(err));
        }
      });
    stream.pipe(csvStream);
  });

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);
