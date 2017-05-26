var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

//connection database local
var mongo = require('mongodb');
var monk = require('monk');
// connection heroku
 var db = monk('mongodb://admin:melvil@ds137121.mlab.com:37121/heroku_6pwg8vg8');

var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

app.use(require('express-json-promise')());
app.use(cors({credentials: true, origin: true}));
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/admin', require('./routes/middleware/validateRequest.js'));
app.use('/admin', admin);


// Make our db accessible to our router


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


app.all('*', function(req, res){
  res.redirect('/');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

