const express = require('express');
const app = express();

var allowCrossDomain = function (req, res, next) {
  let allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
  origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

app.use(allowCrossDomain);

module.exports = app;
