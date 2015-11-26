'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Tab;
let PartialTab;

let tabSchema = Schema({
  tabName : {type: String, required : true, unique: true},
  links : [{type: mongoose.Schema.Types.ObjectId, ref: 'Link'}] 
  //links : [{type: String}]
});

tabSchema.statics.removeTab = function(tabToRemove, cb) {
    Tab.findOne({tabName: tabToRemove.tabName }, function(err, foundTab){
      if(!foundTab) {return cb("No Tag Found With That Name!", null)}
      if(foundTab.links.length){
        return cb('You Cannot Delete A Tab With Links Attached!', null)
      }
      Tab.remove({tabName: tabToRemove.tabName }, function(err, removedTab){
        console.log('tag Removed:  ', removedTab);
        cb(err, removedTab)
      })
    });
};

tabSchema.statics.updateTab = function(req, cb){
  var tabNames = req.body;
  Tab.findOneAndUpdate({tabName: tabNames.oldName}, {$set: {tabName: tabNames.newName}}, function(err, updatedTab){
    if(err) return cb(err, null);
    Tab.findOne({tabName: tabNames.newName}, function(err, tabUpdateInfo){
    if(err) return cb(err, null);
    return cb(null, tabUpdateInfo)
    
    });
  });
}

var Link = require('./link')
tabSchema.statics.addLinkToTab = function(req, cb){
  Link.findOne({linkUrl: req.body.linkUrl}, function(err, foundLink){
    if(foundLink === null || err){return cb('Could Not Find Link With That Name!', null)};
    Tab.findOne({tabName : req.body.tabName}, function(err, tabCheck){
      if (tabCheck === null) return cb('Tag Could not be found!', null)
      if(tabCheck.links.indexOf(foundLink._id) < 0){
        Tab.findOneAndUpdate({tabName : req.body.tabName}, {$push: {links: foundLink._id }}, function(err, foundTab){
          if (err) return cb(err, null);
          return cb(null, foundTab)
        });
      } else {return cb('That link already has that tag!!', null)}
    });
  });

}

Tab = mongoose.model('Tab', tabSchema);
module.exports = Tab;
