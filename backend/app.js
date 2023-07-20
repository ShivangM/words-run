const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

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

module.exports = app;
