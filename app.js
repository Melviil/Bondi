var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//connection database local
var mongo = require('mongodb');
var monk = require('monk');
//var db = process.env.MONGOLAB_URI ||
  //process.env.MONGOHQ_URL ||
  //'localhost:27017/Bondi';

//var db = monk('heroku_6pwg8vg8:heroku_6pwg8vg8@lds137121.mlab.com:37121/heroku_6pwg8vg8');
mongo.connect(process.env.MONGOLAB_URI, {}, function(error, db){

  // console.log will write to the heroku log which can be accessed via the 
  // command line as "heroku logs"
  db.addListener("error", function(error){
    console.log("Error connecting to MongoLab");
  });
  
  db.createCollection('requests', function(err, collection){
    db.collection('requests', function(err, collection){
      var requestCollection = collection;
      connect(
        connect.favicon(),                    // Return generic favicon
        connect.query(),                      // populate req.query with query parameters
        connect.bodyParser(),                 // Get JSON data from body
        function(req, res, next){             // Handle the request
          res.setHeader("Content-Type", "application/json");
          if(req.query != null) {
            requestCollection.insert(req.query, function(error, result){
              // result will have the object written to the db so let's just
              // write it back out to the browser
              res.write(JSON.stringify(result));
            });
          }
          
          res.end();
        }
      ).listen(process.env.PORT || 8080);


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/users', users);

// Make our db accessible to our router

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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





