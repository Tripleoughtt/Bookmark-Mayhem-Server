
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Link;

let linkSchema= Schema({
  linkName: {type: String},
  linkUrl: {type: String, required: true, unique: true}
});

Link = mongoose.model('Link', linkSchema);
module.exports = Link;





