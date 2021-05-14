/* eslint-disable no-console */
const express = require('express');
const db = require('./db');
const routes = require('./routes.js');
// const path = require('path');

const app = express();
const port = 4568;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', routes);
app.get('/loaderio-02b6f38bad3b43fc53c0124e7d5d52bd/', (req, res) => {
  res.send('loaderio-02b6f38bad3b43fc53c0124e7d5d52bd');
});
app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
