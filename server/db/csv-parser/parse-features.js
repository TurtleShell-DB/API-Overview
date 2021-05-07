const csv = require('csvtojson');
const db = require('../index.js');

const csvFilePath = './server/db/data/features.csv';

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach((row) => {
      // db.queryAsync('INSERT INTO Features (id, productID, name, value) VALUES (?)', [row.id, row.product_id, row.feature, row.value])
      db.queryAsync('INSERT INTO Features SET id=?, productID=?, name=?, value=?', [row.id, row.product_id, row.feature, row.value])
        .then(() => console.log('successfully inserted into database!'))
        .catch((err) => console.log(err));
    });
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  })
  .then(() => console.log('Import Complete!'));

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);
