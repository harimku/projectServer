var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homedecorRouter = require('./routes/homedecorRouter');
const automotiveRouter = require('./routes/automotiveRouter');
const electronicsRouter = require('./routes/electronicsRouter');
const fashionRouter = require('./routes/fashionRouter');
const outdoorsRouter = require('./routes/outdoorsRouter');
const petRouter = require('./routes/petRouter');
const cartRouter = require('./routes/cartRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homedecor', homedecorRouter);
app.use('/automotive', automotiveRouter);
app.use('/electronics', electronicsRouter);
app.use('/fashion', fashionRouter);
app.use('/outdoors', outdoorsRouter);
app.use('/pet', petRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;