const db = require('../db');

module.exports = {
  getAll: (callback) => {
    db.queryAsync('SELECT * FROM Products WHERE id BETWEEN 1 AND 4')
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  },

  get: (args, callback) => {
    db.queryAsync('SELECT feature, value FROM Features WHERE productID=?', args)
      .then((feats) => {
        const featureObj = feats;
        db.queryAsync('SELECT * FROM Products WHERE id=?', args)
          .then((product) => {
            const productObj = product;
            // console.log('productObj is ', productObj);
            productObj[0][0].features = featureObj[0];
            return productObj;
          })
          .then((data) => callback(null, data))
          .catch((err) => callback(err));
        // db.queryAsync('SELECT Products.*, Features.feature, Features.value FROM Products INNER JOIN Features ON Products.id=? and Products.id=Features.productID', args)
      });
    // db.queryAsync('SELECT Products.* FROM Products WHERE Products.id=? and Products.id=Features.productID', args)
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
