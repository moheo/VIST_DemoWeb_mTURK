let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')

let app = express();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let formRouter = require('./routes/form_received');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form_received', formRouter);



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



//mongodb open
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});

mongoose.connect('mongodb://localhost/lyricdb');

//https://mongoosejs.com/docs/
//it is a codeblock for connecting to a db server thus running another server for mongodb is required


module.exports = app;
