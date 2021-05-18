/* eslint-disable no-console */
const model = require('../models');
const cache = require('../db/lrucache/index.js');

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
    const productCacheKey = `product + ${args}`;
    if (!cache.get(productCacheKey)) {
      model.get(args, (err, data) => {
        if (err) {
          console.log(err);
        }
        cache.set(productCacheKey, data);
        res.send(data);
      });
    } else {
      res.send(cache.get(productCacheKey));
    }
  },

  styles: (req, res) => {
    const args = req.params.product_id;
    const productCacheKey = `styles + ${args}`;
    if (!cache.get(productCacheKey)) {
      model.getStyle(args, (err, data) => {
        if (err) {
          console.log(err);
        }
        cache.set(productCacheKey, data);
        res.send(data);
      });
    } else {
      res.send(cache.get(productCacheKey));
    }
  },

  related: (req, res) => {
    const args = req.params.product_id;
    const productCacheKey = `styles + ${args}`;
    if (!cache.get(productCacheKey)) {
      model.getRelated(args, (err, data) => {
        if (err) {
          console.log(err);
        }
        cache.set(productCacheKey, data);
        res.send(data);
      });
    } else {
      res.send(cache.get(productCacheKey));
    }
  },
};
