const csv = require('csvtojson');
const db = require('../index.js');

const csvFilePath = './server/db/data/styles.csv';

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach((row) => {
      let { id, productId, name, sale_price, original_price, default_style } = row;
      if (original_price[0] === '$') {
        original_price = original_price.slice(1);
      }
      if (sale_price[0] === '$') {
        sale_price = sale_price.slice(1);
      }
      if (sale_price === 'null') {
        db.queryAsync('INSERT INTO Styles SET styleID=?, productID=?, salePrice=?, originalPrice=?, name=?, defaultStyle=?', [id, productId,, original_price, name, default_style])
          // .then(() => console.log('successfully inserted into database!'))
          .catch((err) => console.log(err));
      } else {
        db.queryAsync('INSERT INTO Styles SET styleID=?, productID=?, salePrice=?, originalPrice=?, name=?, defaultStyle=?', [id, productId, sale_price, original_price, name, default_style])
          // .then(() => console.log('successfully inserted into database!'))
          .catch((err) => console.log(err));
      }
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
