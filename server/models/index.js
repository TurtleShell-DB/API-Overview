const db = require('../db');

module.exports = {
  getAll: (callback) => {
    db.queryAsync('SELECT * FROM Product')
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  get: (args, callback) => {
    db.queryAsync('SELECT * FROM Product', (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  getStyle: (args, callback) => {
    db.queryAsync('SELECT * FROM Styles', (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  getRelated: (args, callback) => {
    db.queryAsync('SELECT * FROM Related', (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
};
