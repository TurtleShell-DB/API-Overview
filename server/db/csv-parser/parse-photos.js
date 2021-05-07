// const csv = require('csvtojson');
// const db = require('../index.js');

// const csvFilePath = './server/db/data/photos.csv';

// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     jsonObj.forEach((row) => {
//       let { id, styleId, url, thumbnail_url } = row;
//       db.queryAsync('INSERT INTO Photos SET photoID=?, styleID=?, url=?, thumbnailUrl=?', [id, styleId, url, thumbnail_url])
//         // .then(() => console.log('successfully inserted into database!'))
//         .catch((err) => console.log(err));
//     });
//   })
//   .then(() => console.log('Import Complete!'));

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);
const readline = require('readline');
const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql2');
const Promise = require('bluebird');

const csvFilePath = './server/db/data/photosshort.csv';
const createTables = require('../table-config');

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
  .then(() => {
    const rl = readline.createInterface({
      input: fs.createReadStream(csvFilePath),
    });

    const stream = fs.createReadStream(csvFilePath);
    const csvData = [];
    const csvStream = fastcsv
      .parse()
      .on('data', (data) => {
        const row = [];
        // row.push(parseInt(data[0]), parseInt(data[1]), data[2].toString, data[3].toString);
        if (data.length !== 4 || typeof data[3] !== 'string' || data[0] === 'id') {
          // console.log('error!!!!');
        } else {
          // console.log(data);
          csvData.push(data);
        }
      })
      .on('end', () => {
        db.queryAsync('INSERT INTO Photos (photoID, styleID, url, thumbnailUrl) VALUES ?', [csvData])
          .then(() => console.log('Successfully imported!'))
          .catch((err) => console.log(err));
      });
    stream.pipe(csvStream);
  });

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);
