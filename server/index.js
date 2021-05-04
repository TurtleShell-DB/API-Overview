const express = require('express');
// const path = require('path');

const app = express();
const port = 4568;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/hello', (req, res) => (
  res.send('hey')
));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
