// const csv = require('csvtojson');
// const db = require('../index.js');

// const csvFilePath = './server/db/data/styles.csv';

// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     jsonObj.forEach((row) => {
//       let { id, productId, name, sale_price, original_price, default_style } = row;
//       if (original_price[0] === '$') {
//         original_price = original_price.slice(1);
//       }
//       if (sale_price[0] === '$') {
//         sale_price = sale_price.slice(1);
//       }
//       if (sale_price === 'null') {
//         db.queryAsync('INSERT INTO Styles SET styleID=?, productID=?, salePrice=?, originalPrice=?, name=?, defaultStyle=?', [id, productId,, original_price, name, default_style])
//           // .then(() => console.log('successfully inserted into database!'))
//           .catch((err) => console.log(err));
//       } else {
//         db.queryAsync('INSERT INTO Styles SET styleID=?, productID=?, salePrice=?, originalPrice=?, name=?, defaultStyle=?', [id, productId, sale_price, original_price, name, default_style])
//           // .then(() => console.log('successfully inserted into database!'))
//           .catch((err) => console.log(err));
//       }
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
            // .then(() => db.queryAsync(`UPDATE ${table} SET salePrice = NULLIF(salePrice, '')`))
            .then(() => console.log(`Successfully imported! ${i}`))
            .catch((err) => console.log(err));
        }
      });
    stream.pipe(csvStream);
    // };
  });
