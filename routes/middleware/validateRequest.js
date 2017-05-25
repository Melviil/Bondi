var jwt = require('jsonwebtoken');
var secretToken = require('../privatetoken');

module.exports = function(req, res, next) {
 console.log("fonction");
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
 
  var token = req.cookies.token;
  console.log(req.cookies.token);
      console.log(token);
  if (token) {
    try {
      var decoded = jwt.decode(token, secretToken);
     
      console.log(decoded.pseudo);
 
     /* if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }*/
 
      // Authorize the user to see if s/he can access our resources
      var db = req.db;
      var collection = db.get('usercollection');

      collection.find({ pseudo: decoded.pseudo },function(err, result){
      
        if(result.length > 0  ){
          console.log(result[0].admin);
            if ( result[0].admin == 'true' ){
              console.log("TROUVE");
            res.render('admin', { title: 'Bondi' });
            }else{
            res.redirect('/');
          }
        }else{
           res.redirect('/');
        }
        return;

        });
   }catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });

  }
  }else{
    conole.log("mauvais token");
    return res.status(400);
  }
}