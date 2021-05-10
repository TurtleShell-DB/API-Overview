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
        console.log('hey');
      }
      console.log('features only are ', data[0][0]);
      res.send(data[0][0]);
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
