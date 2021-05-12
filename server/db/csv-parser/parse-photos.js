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
    });

    const csvData = [];
    let count = 0;
    const csvStream = fastcsv
      .parse()
      .on('data', (data) => {
        if (data[0] === 'id') {
          console.log('removed header');
        } else {
          if (data.length !== 4) {
            data.push('');
          }
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
  });
