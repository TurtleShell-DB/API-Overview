/* eslint-disable no-console */
const model = require('../models');

module.exports = {
  products: (req, res) => {
    console.log('from products');
    model.getAll((err, data) => {
      if (err) {
        console.log('hello');
      }
      res.send(data);
    });
  },

  product: (req, res) => {
    console.log('from single product');
    const args = req.params.product_id;
    model.get(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data[0][0]);
    });
  },

  styles: (req, res) => {
    console.log('from styles');
    const args = req.params.product_id;
    model.getStyle(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      // console.log('style data from server ', data[0].results[0].photos);
      res.send(data[0]);
    });
  },

  related: (req, res) => {
    console.log('from related');
    const args = req.params.product_id;
    model.getRelated(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      // console.log('data is ', data);
      res.send(data);
    });
  },
};
