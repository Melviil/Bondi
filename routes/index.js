var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var secret = require('../routes/private.js');
var secretToken = require('../routes/privatetoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  var db = req.db;
});

exports.index = function(req, res){
    res.render('index');
};

module.exports = router;

/ GET connection page. /
router.get('/connection', function(req, res) {
    res.render('connection'); 
});
/ GET register page. /
router.get('/register', function(req, res) {
    res.render('register'); 
});
/ GET the about page. /
router.get('/about', function(req, res) {
    res.render('about');
});
/ GET Map page. /
router.get('/index', function(req, res) {
    res.render('index');
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
/ Get the list of likes. /
router.get('/listlikes', function(req, res) {
    var db = req.db;
    var collection = db.get('likecollection');
    collection.find({},{},function(e,docs){
        res.status(200).json(docs);
    });
});

/ POST to Add marker Service /
router.put('/addmarker', function(req, res) {
     // recupère la variable de la bdd
     var db = req.db;
     console.log(req.body);
    // Get the marker informations
    var pseudo = req.body.person;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var year = req.body.year;
    var url = req.body.url;
    var place = req.body.place;
    var nblike = req.body.nblike;
    

    // Set our collection
    var collection = db.get('markercollection');
    console.log("ON ANJOUTE");
    // Submit the marker to the DB
    collection.insert({
        "pseudo" : pseudo,
        "latitude" : latitude,
        "longitude" : longitude,
        "year" : year,
        "place" : place,
        "url" : url,
        "nblike" : 0
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
            //res.redirect("userlist");
        }
    });
});

/ POST to check if a user exists/
router.post('/checkuser', function(req, response) {

     // recupère la variable de la bdd

     var db = req.db;

    // Get the user informations
    var pse = req.body.pseudo;
    var pas = req.body.password;
   var pascheck = req.body.passwordcheck; // pour éviter les instrusions en changeant le JS


    //check same paswwords
    if ( pas != pascheck){
        var collection = db.get('usercollection');
        collection.find({ pseudo: pse },function(err, result){
            console.log("recherche");
            if (!result.length) {
                console.log("no");
            response.sendStatus(400); //mauvais pseudo

        } 
        var cipher = crypto.createCipher('aes-256-ctr',pas);
        var crypted = cipher.update(secret,'utf8','hex');
        crypted += cipher.final('hex');
        console.log(crypted);
        console.log(result[0].password);

       if ( crypted == result[0].password){ //mot de passe bdd == mot de basse rentré crypté ? 

          var userInfo = {
            pseudo: result[0].pseudo,
            name: result[0].name,
            password: result[0].password,
            admin : result[0].admin
        }


        console.log("Utilisateur connu");

        var token = jwt.sign({
          pseudo: pse
            }, secretToken); // on met dans le token le pseudo de la personne crypté
           // windows session storage 


           response.status(200);
           response.send({
            token : token
        });
           console.log("bien envoyé");

       }
       else{
            response.sendStatus(400); // mauvais pass
        }
    });
}else{
        response.sendStatus(400); // mauvais pass
    }
    


});

/ POST to Add a user /
router.put('/adduser', function(req, response) {
    console.log("add user ");
     // recupère la variable de la bdd

     var db = req.db;
     console.log(req.body);
    // Get all the user  informations
    var pse = req.body.pseudo;
    var nam = req.body.name;
    var pas = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');

    collection.find({ pseudo: pse },function(err, res){ // on regarde que le pseudo n'existe pas
        if (!res.length) {
            console.log("nouvel utilisateur");
            / Cryptage /
            var cipher = crypto.createCipher('aes-256-ctr',pas)
            var crypted = cipher.update(secret,'utf8','hex')
            crypted += cipher.final('hex'); // on crypte le password avec une clé et un secret

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
                response.sendStatus(200); 
            }
        });
        }else{
                response.sendStatus(400); // pseudo existe, on renvoie une errur 400 interprété par le js
            }
        });

});

/ POST to supp marker /
router.delete('/suppmarker', function(req, res) {
    console.log("trouvé");
     // recupère la variable de la bdd
     var db = req.db;

    // Get informations about the marker to delete
    var id = req.body.id;

    // Set our collection
    var markercollection = db.get('markercollection');
    var likecollectioncollection = db.get('likecollection');
    // Submit the marker to the DB
    markercollection.remove({
        "_id" : id
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
            likecollection.remove({"idmarker" : id});
        }
    });
    
});
/ POST to supp like by pseudo /
router.delete('/supplikesbypseudo', function(req, res) {

     // recupère la variable de la bdd
     var db = req.db;

     var pseudo = req.body.pseudo;
     console.log("supplikesbypseudo");
    // Set our collection
    var likecollection = db.get('likecollection');


    likecollection.remove({"pseudo" : pseudo}), function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    };


});
/ POST to supp marker by pseudo /
router.delete('/suppmarkersbypseudo', function(req, res) {

     // recupère la variable de la bdd
     var db = req.db;

     var pseudo = req.body.pseudo;

    // Set our collection
    var markercollection = db.get('markercollection');


    markercollection.remove({"pseudo" : pseudo}), function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    };


});
router.delete('/suppuserbypseudo', function(req, res) {

     // recupère la variable de la bdd
     var db = req.db;

     var pseudo = req.body.pseudo;

    // Set our collection
    var usercollection = db.get('usercollection');


    usercollection.remove({"pseudo" : pseudo}), function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);        }
        };


    });
router.delete('/supplikesbyidmarker', function(req, res) {

     // recupère la variable de la bdd
     var db = req.db;

     var id = req.body.idmage;

    // Set our collection
    var likecollection = db.get('likecollection');


    usercollection.remove({"idmarker" : id}), function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    };


});
router.delete('/suppmarkerbyidmarker', function(req, res) {

     // recupère la variable de la bdd
     var db = req.db;

     var id = req.body.idmage;

    // Set our collection
    var markercollection = db.get('markercollection');


    markercollection.remove({"_id" : id}), function (err, doc) {
        if (err) {
            // If it failed, return error
            res.sendStatus("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    };


});

/ find the pseudo in the token /
router.post('/gettokenpseudo', function(req, response) {

     // recupère la variable de la bdd
     var db = req.db;
    // Get the decoded token
    var decoded = jwt.decode(req.body.token, secretToken);
    // Check if we have the pseudo
    if ( decoded.pseudo !=""){
       response.status(200);
       return response.send({pseudo : decoded.pseudo});
   }else{
    return response.sendStatus(400);
}
});



/Ajout d'un like dans la DDB/
router.put('/addlike', function(req, response){
     // recupère la variable de la bdd
     var db = req.db;
    // Get all the markers informations
    var idimage = req.body.oidimage;
    var pseudo = req.body.pseudoUser;

    // Set our collection
    var usercollection = db.get('usercollection');
    var markercollection = db.get('markercollection');
    var likecollection = db.get('likecollection');
    usercollection.find({ "pseudo": pseudo },function(err, result){
        if (result.length > 0 ){// check user exists au cas où injection js
            markercollection.find({ "_id": idimage },function(err, res){  

                 if (res.length > 0 ){ // check marker exists au cas où injection js
                    likecollection.find({"pseudo":pseudo, "idmarker": idimage}, function(err,reslike){
                        if (reslike.length == 0){ // la personne n'a jamais liké cette photo
                            likecollection.insert({
                                "pseudo" : pseudo,
                                "idmarker" : idimage
                            });
                        ajouteffectue = 1;
                        response.sendStatus(200);
                    }else{
                     response.sendStatus(400);
                 }
             });

                }else{
                    response.sendStatus(400);
                }
            });
        }else{
            response.sendStatus(400);
        }
    } , function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
    });
}); 




/ update the nblike on a marker /
router.put('/updatelikemarker', function(req, response) {
    console.log("like : ");
    console.log(req.body.oidimage);

     // recupère la variable de la bdd
     var db = req.db;
    // Get the decoded token

    var idimage = req.body.oidimage;

    var markercollection = db.get('markercollection');
    markercollection.find({ "_id": idimage },function(err, res){ 
        var likes = res[0].nblike+1;
        markercollection.update( {  "_id": idimage},
           {$set :{ "nblike": likes}});
    });


    markercollection.find({ "_id": idimage },function(err, res){ 
        console.log(res);
    });

});

