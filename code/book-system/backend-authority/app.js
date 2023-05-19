var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bookRouter = require('./routes/books')
const loginRouter = require('./routes/login')
const session = require('express-session')
const loginVerify = require('./util/loginVerify');  //中间件
const sessionStore = require('./mysql.db.config/sessionStore');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: 'SESSION_ID',
  secret: 'a random secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false //为 true 时候表示只有 https 协议才能访问cookie
  },
  store: sessionStore
}))


app.use('/login', loginRouter)
app.use(loginVerify) //session验证中间件
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter)


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
