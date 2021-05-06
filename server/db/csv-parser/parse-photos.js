const csv = require('csvtojson');
const db = require('../index.js');

const csvFilePath = './server/db/data/photos.csv';

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach((row) => {
      let { id, styleId, url, thumbnail_url } = row;
      db.queryAsync('INSERT INTO Photos SET photoID=?, styleID=?, url=?, thumbnailUrl=?', [id, styleId, url, thumbnail_url])
        // .then(() => console.log('successfully inserted into database!'))
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
