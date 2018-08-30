let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser')

let app = express();

let port = process.env.PORT || 3000; // $ PORT = ___ 

let indexRouter = require('./routes/index');

/*
let pubScriptRouter = require('./routes/pubscript'); // script(routes/pubscript.js) for routing public/javascripts
let pubScriptRouter = require('./routes/pubstyle'); //
let pubImgRouter = require('./routes/pubimgs'); // 
*/
//let usersRouter = require('./routes/users');
//let formRouter = require('./routes/form_received');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*
app.set('views', path.join(__dirname, ()=>{
    console.log(__dirname);
    return 'views'
}));
*/

app.set('view engine', 'pug');
/* dunno what exactly app.set() does. It is defaulting sth
app.set('public/images/test', path.join(__dirname, 'public/images/test'));
app.set('public/javascripts', path.join(__dirname, 'public/javascripts'));
app.set('public/stylesheets', path.join(__dirname, 'public/stylesheets'));
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(express.static(path.join(__dirname, () =>{
    console.log(__dirname);
    return 'public'
})));*/

app.use('/', indexRouter);
//app.use('/public/script', publicRouter);

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

mongoose.connect('mongodb://localhost/glacnet_5splits_200');

/*
e.g.mongodb://localhost/glacnet_fa24
container names
fa24
1b9e
05c9
10f6
699e
d596
82c1
5c8e
7d2c
5d80
*/

//https://mongoosejs.com/docs/
//it is a codeblock for connecting to a db server thus running another server for mongodb is required

module.exports = app;
