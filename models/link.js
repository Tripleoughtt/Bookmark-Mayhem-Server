
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Link;

let linkSchema= Schema({
  linkName: {type: String},
  linkUrl: {type: String, required: true, unique: true},
  dateCreated: {type: Date, required: true, default: Date.now()}
});

Link = mongoose.model('Link', linkSchema);
module.exports = Link;





