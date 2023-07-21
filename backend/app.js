const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const gameRoute = require('./routes/game-route');

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

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'somethingsecretgoeshere',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 15000, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: ' Too many req from this IP , please Try  again in an Hour ! ',
});

app.use('/api', limiter);

app.use('/api/game', gameRoute);

module.exports = app;
