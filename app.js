const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();


const methodOverride = require('method-override');

const session = require('express-session');
const redis = require("redis");
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();
const { cookiesCleaner } = require('./middleware/auth');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formRouter = require('./routes/form');
const pageRouter = require('./routes/pages');
const poolRouter = require('./routes/pool');


mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({ extended: false }));

// json.
app.use(express.json());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/pages', pageRouter);
app.use('/pools', poolRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  store: new RedisStore({
    client,
    host: 'localhost',
    port: 6379,
    //  ttl :  260
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));
app.use(cookiesCleaner);

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
