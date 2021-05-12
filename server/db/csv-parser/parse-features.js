const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql2');
const Promise = require('bluebird');

const csvFilePath = './server/db/data/features.csv';
const createTables = require('../table-config');

const database = 'SDC';
const table = 'Features';

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
        if (data[0] === 'id') {
          console.log('removed header');
        } else {
          csvData.push(data);
          count++;
        }
        if (count % 50000 === 0) {
          console.log(count);
        }
      })
      .on('end', () => {
        for (let i = 0; i < csvData.length; i += 100000) {
          db.queryAsync('INSERT INTO Features (id, productID, feature, value) VALUES ?', [csvData.slice(i, i + 100000 - 1)])
            .then(() => console.log(`Successfully imported! ${i}`))
            .catch((err) => console.log(err));
        }
      });
    stream.pipe(csvStream);
  });

  // const csv = require('csvtojson');
// const db = require('../index.js');

// const csvFilePath = './server/db/data/features.csv';

// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     jsonObj.forEach((row) => {
//       // db.queryAsync('INSERT INTO Features (id, productID, name, value) VALUES (?)', [row.id, row.product_id, row.feature, row.value])
//       db.queryAsync('INSERT INTO Features SET id=?, productID=?, name=?, value=?', [row.id, row.product_id, row.feature, row.value])
//         .then(() => console.log('successfully inserted into database!'))
//         .catch((err) => console.log(err));
//     });
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
//   })
//   .then(() => console.log('Import Complete!'));

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);

// const readline = require('readline');