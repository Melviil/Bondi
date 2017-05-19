// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var marker = new Schema({
  pseudo: { type: String, required: true, unique : true },
  password: { type: String, required: true },
  date: { type: Boolean, required: true, unique :true }
}, {collection : 'usercollection'});