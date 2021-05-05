/* eslint-disable no-console */
const model = require('../models');

module.exports = {
  products: (req, res) => {
    console.log('from products');
    model.getAll((err, data) => {
      if (err) {
        console.log('hello');
      }
      res.end(JSON.stringify(data));
    });
  },

  product: (req, res) => {
    console.log('from product');
    model.get((err, data) => {
      if (err) {
        console.log('hey');
      }
      res.end(JSON.stringify(data));
    });
  },

  styles: (req, res) => {
    console.log('from styles');
    model.getStyle((err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(JSON.stringify(data));
    });
  },

  related: (req, res) => {
    console.log('from related');
    model.getRelated((err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(JSON.stringify(data));
    });
  },
};
