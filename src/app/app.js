const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Webapp listening at http://${process.env.HOST}:${process.env.PORT}`);
});

module.exports = app;