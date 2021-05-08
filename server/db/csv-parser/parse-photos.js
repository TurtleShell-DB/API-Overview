const readline = require('readline');
const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql2');
const Promise = require('bluebird');

const csvFilePath = './server/db/data/photos.csv';
const createTables = require('../table-config');

const database = 'SDC';

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
  .then(() => createTables(db))
  .then(() => {
    const stream = fs.createReadStream(csvFilePath);
    const rl = readline.createInterface({
      input: stream,
    });

    rl.on('line', (line) => {
      if (line[line.length - 1] !== '"') {
        line += '"';
      }
      csvStream.write(line + '\n');
    });

    rl.on('close', () => {
      csvStream.end();
      // parseCSV();
    });

    // const parseCSV = () => {
    const csvData = [];
    let count = 0;
    const csvStream = fastcsv
      .parse()
      .on('data', (data) => {
        // const row = [];
        // row.push(parseInt(data[0]), parseInt(data[1]), data[2].toString, data[3].toString);
        if (data[0] === 'id') {
          console.log('removed header');
        } else {
          if (data.length !== 4) {
            data.push('');
          }
          // console.log(data);
          csvData.push(data);
          count++;
        }
        if (count % 50000 === 0) {
          console.log(count);
        }
      })
      .on('end', () => {
        for (let i = 0; i < csvData.length; i += 100000) {
          db.queryAsync('INSERT INTO Photos (photoID, styleID, url, thumbnailUrl) VALUES ?', [csvData.slice(i, i + 100000 - 1)])
            .then(() => console.log('Successfully imported!'))
            .catch((err) => console.log(err));
        }
      });
    // stream.pipe(csvStream);
    // };
  });

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);


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
