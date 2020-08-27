const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//custom routers
const homedecorRouter = require('./routes/homedecorRouter');
const automotiveRouter = require('./routes/automotiveRouter');
const electronicsRouter = require('./routes/electronicsRouter');
const fashionRouter = require('./routes/fashionRouter');
const outdoorsRouter = require('./routes/outdoorsRouter');
const petRouter = require('./routes/petRouter');
const cartRouter = require('./routes/cartRouter');

//connect to the MongoDB server
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connect.then(
    () => console.log('Connected correctly to server'),
    err => console.log(err)
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware is applied to request in order of declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homedecors', homedecorRouter);
app.use('/automotives', automotiveRouter);
app.use('/electronics', electronicsRouter);
app.use('/fashions', fashionRouter);
app.use('/outdoors', outdoorsRouter);
app.use('/pets', petRouter);
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