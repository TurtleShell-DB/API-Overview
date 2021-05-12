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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
