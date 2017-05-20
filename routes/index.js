var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var secret = 'ILoveHummusAndAnanas'; // mot de passe
var secretToken = 'ILoveCharwarma'; // jwt
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

/ GET connection page. /
router.get('/connection', function(req, res) {
    res.render('connection', { title: 'connection' }); 
});
/ GET register page. /
router.get('/register', function(req, res) {
    jwt.verify(token, cert, { algorithms: ['RS256'] }, function(err, decoded) {
              res.render('register', { title: 'register' }); 
            });
   
});
/ GET the about page. /
router.get('/about', function(req, res) {
    res.render('about', { title: 'about' });
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
        res.status(200).json(docs);
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
/ POST to Add marker Service /
router.post('/checkuser', function(req, response) {
   
    // Set our database ( bondi here) 
   
    var db = req.db;
 
    // Get all the markers informations
    var pse = req.body.pseudo;
   var pas = req.body.password;
    

    // Set our collection
    var collection = db.get('usercollection');
    console.log(pse);
    console.log(pas);
    collection.find({ pseudo: pse },function(err, result){

        if (!result.length) {
            response.sendStatus(400).send("Wrong pseudo");

        } 
        var cipher = crypto.createCipher('aes-256-ctr',pas);
        var crypted = cipher.update(secret,'utf8','hex');
        crypted += cipher.final('hex');
        console.log(crypted);
        console.log(result[0].password);
         
       if ( crypted == result[0].password){

              var userInfo = {
                pseudo: result[0].pseudo,
                name: result[0].name,
                password: result[0].password,
                admin : result[0].admin
            }
 
            
            console.log("Utilisateur connu");
            
           var token = jwt.sign({
              pseudo: pse
            }, secretToken, { expiresIn: '1h' });

           jwt.verify(token, secretToken, {
              pseudo: pse
            }, function(err, decoded) {
              console.log(decoded);
              console.log("true");
            });

            console.log(token);
            response.sendStatus(200);
            response.redirect("/");

        }
        else{
            response.sendStatus(400).send("Wrong password");
        }
    
     
});
});

/ POST to Add marker Service /
router.post('/adduser', function(req, response) {
    console.log("add user ");
    // Set our database ( bondi here) 
   
    var db = req.db;
    console.log(req.body);
    // Get all the markers informations
    var pse = req.body.pseudo;
    var nam = req.body.name;
   var pas = req.body.password;
   
    // Set our collection
    var collection = db.get('usercollection');

    collection.find({ pseudo: pse },function(err, res){
        if (!res.length) {
            console.log("nouvel utilisateur");
            / Cryptage /
            var cipher = crypto.createCipher('aes-256-ctr',pas)
            var crypted = cipher.update(secret,'utf8','hex')
            crypted += cipher.final('hex');
            /insertion /
            collection.insert({
            "pseudo" : pse,
            "name" : nam,
            "password" : crypted,
            "admin" : "false"
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                response.send("There was a problem adding the information to the database.");
            }
            else {
                response.send(200);
                response.redirect("/");
            }
        });
            }else{
                console.log("utilsateur existe");
                response.status(400).send("utilsiateur existe");
            
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


           
          
  