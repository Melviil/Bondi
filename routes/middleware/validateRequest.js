var jwt = require('jsonwebtoken');
var secretToken = require('../privatetoken');

module.exports = function(req, res, next) {

  var token = req.cookies.token;
  if (token) {
    try {
      var decoded = jwt.decode(token, secretToken);



      // Authorize the user to see if s/he can access our resources
      var db = req.db;
      var collection = db.get('usercollection');

      collection.find({ pseudo: decoded.pseudo },function(err, result){

        if(result.length > 0  ){
          if ( result[0].admin == 'true' ){
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