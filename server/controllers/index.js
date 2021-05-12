/* eslint-disable no-console */
const model = require('../models');

module.exports = {
  products: (req, res) => {
    model.getAll((err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data);
    });
  },

  product: (req, res) => {
    const args = req.params.product_id;
    model.get(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data[0][0]);
    });
  },

  styles: (req, res) => {
    const args = req.params.product_id;
    model.getStyle(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data[0]);
    });
  },

  related: (req, res) => {
    const args = req.params.product_id;
    model.getRelated(args, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data);
    });
  },
};
