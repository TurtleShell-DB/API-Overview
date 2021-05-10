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
            productObj[0][0].features = featureObj[0];
            return productObj;
          })
          .then((data) => callback(null, data))
          .catch((err) => callback(err));
      });
  },

  getStyle: (args, callback) => {
    db.queryAsync('SELECT styleID, name, originalPrice, salePrice, REPLACE(REPLACE(defaultStyle,0,"false"),1,"true") AS defaultStyle FROM Styles WHERE productID=?', args)
      .then((styles) => {
        const stylesObj = {
          product_id: args,
        };
        stylesObj.results = styles[0];
        return stylesObj;
      })
      .then((stylesObj) => {
        const promises = [];
        for (let i = 0; i < stylesObj.results.length; i += 1) {
          const addPhotosSkus = db.queryAsync('SELECT thumbnailUrl, url FROM Photos WHERE styleID=?', stylesObj.results[i].styleID)
            .then((photosObj) => {
              stylesObj.results[i].photos = photosObj[0];
              return stylesObj;
            })
            .then((stylesObj) => db.queryAsync('SELECT id, quantity, size FROM SKUs WHERE styleID=?', stylesObj.results[i].styleID)
              .then((skusObj) => {
                stylesObj.results[i].skus = {};
                for (let j = 0; j < skusObj[0].length; j += 1) {
                  stylesObj.results[i].skus[skusObj[0][j].id] = {
                    quantity: skusObj[0][j].quantity,
                    size: skusObj[0][j].size,
                  };
                }
                // stylesObj.results[i].skus = skusObj[0];
                return stylesObj;
              }));
          promises.push(addPhotosSkus);
        }
        Promise.all(promises)
          .then((data) => {
            callback(null, data);
          })
          .catch((err) => callback(err));
        // return stylesObj;
      });
    // .then((data) => callback(null, data))
    // .catch((err) => callback(err));
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
