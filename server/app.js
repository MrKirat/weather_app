var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var rootRouter = require('./routes/root');
var weatherRouter = require('./routes/weather');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/weather', weatherRouter);
app.use('*', rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // return the error message
  res
    .status(err.status || 500)
    .type('json')
    .send({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
