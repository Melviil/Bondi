var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var secret = require('./private.js');
var secretToken = require('./privatetoken');

/ GET admin page. /
router.get('/admin', function(req, res) {
    console.log("mdr");
    res.render('admin', { title: 'Bondi' });
    var db = req.db;
    var collection = db.get('markercollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "markerlist" : docs
        });
    });
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('index', {
            "userlist" : docs
        });
    });    
});
module.exports = router;