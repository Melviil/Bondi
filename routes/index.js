var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bondi' });
    var db = req.db;
   /* var collection = db.get('markercollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "markerlist" : docs
        });
    });*/
});
exports.index = function(req, res){
res.render('index', { title: 'ejs' });};

module.exports = router;

/ GET Hello World page. /
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});
/ GET Map page. /
router.get('/index', function(req, res) {
    res.render('index', { title: 'Bondi' });
    var db = req.db;
    var collection = db.get('markercollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "markerlist" : docs
        });
    });  
});


/ GET Userlist page. /
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
/ GET MarkerList page. /
router.get('/markerlist', function(req, res) {
    var db = req.db;
    var collection = db.get('markercollection');
    collection.find({},{},function(e,docs){
        res.status(200).json(docs);
    });
});
/ GET New User page. /
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
/ POST to Add marker Service /
router.post('/addmarker', function(req, res) {
    console.log("add a marker");
    // Set our database ( bondi here) 
   
    var db = req.db;
    console.log(req.body);
    // Get all the markers informations
    var pseudo = req.body.person;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var year = req.body.year;
    var url = req.body.url;
    var place = req.body.place;
    

    // Set our collection
    var collection = db.get('markercollection');

    // Submit the marker to the DB
   collection.insert({
        "pseudo" : pseudo,
        "latitude" : latitude,
        "longitude" : longitude,
        "year" : year,
        "place" : place,
        "url" : url
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.send(200);
            //res.redirect("userlist");
        }
    });
});
/ POST to Add city Service /
router.post('/addcity', function(req, res) {

    // Set our database ( bondi here) 
    var db = req.db;

    // Get all the markers informations
    var name = req.name;
    var latitude = req.lat;
    var longitude = req.lng;
  
    // Set our collection
    var collection = db.get('markercollection');

    // Submit the marker to the DB
    collection.insert({
        "pseudo" : pseudo,
        "latitude" : latitude,
        "longitude" : longitude
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            //TODO
            //res.redirect("userlist");
        }
    });
});