
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tab = require('./tab')
let Link;

let linkSchema= Schema({
  linkName: {type: String},
  linkUrl: {type: String, required: true, unique: true},
  dateCreated: {type: Number, required: true, default: Date.now()}
});

linkSchema.statics.removeLink = function(req, cb){
  console.log(req)
  Link.findOne({linkUrl: req.body.linkUrl}, function(err, link){
    if(link === null) return cb("Link Was Not Found");
    console.log(link)
    if(err) return cb(err, null)
    Tab.find({ links: link._id }, function(err,tabs){
      if(err) return cb(err, null);
      console.log(tabs)
      if(tabs.length){
      tabs.forEach(function(tab){
        tab.links.splice(tab.links.indexOf(link._id),1);
        tab.save(function(err){
          if(err) return cb('Error saving tags', null) ;
        })
      })
      }
      Link.remove({linkUrl: link.linkUrl}, function(err, removedLink){
        if (err) return cb(err, null);
        return cb(null, removedLink);
      });
    })
  })
}


Link = mongoose.model('Link', linkSchema);
module.exports = Link;





