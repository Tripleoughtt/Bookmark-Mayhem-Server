'use strict';

var Tab = require('./tab');
var Link = require('./link');


var Module = { deleteLink : function(req, cb){
  Link.findOne({linkUrl: req.body.linkUrl}, function(err, link){
    console.log(link);
    if(err) return cb(err, null);
    Tab.find({ links: link._id }, function(err,tabs){
      if(err) return cb(err, null);
      console.log(tabs);
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
},
  removeLinkFromTab : function(req, cb){
    Tab.findOne({tabName: req.body.tabName},function(err, foundTab){
      if (err) return cb(err, null);
      if (foundTab === null) return cb("Couldn't Find Tag You Are Looking For.", null);
      Link.findOne({linkUrl: req.body.linkUrl}, function(err, foundLink){
        if (err) return cb(err, null);
        if (foundLink === null) return cb("Link Couldn't be found!", null);
        var deleteIndex = foundTab.links.indexOf(foundLink._id);
        foundTab.links.splice(deleteIndex, 1);
        foundTab.save(function(err, savedLink){
          if (err) return cb(err, null);
          if (savedLink === null) return ('Something went wrong during your operation, sorry', null);
          return cb(null, savedLink);
        });

      });
    });
  }
}

module.exports = Module 
