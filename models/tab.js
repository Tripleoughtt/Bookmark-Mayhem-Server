'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Tab;

let tabSchema = Schema({
  tabName : {type: String, required : true, unique: true},
  links : [{type: mongoose.Schema.Types.ObjectId, ref: 'Link'}] 
  //links : [{type: String}]
});

Tab = mongoose.model('Tab', tabSchema);
module.exports = Tab;
