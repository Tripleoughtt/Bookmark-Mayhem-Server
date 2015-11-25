
'use strict';

var express = require('express');
var router = express.Router();
var Link = require('../models/link')
var Tab = require('../models/tab')

router.get('/', function(req,res){
  res.send('We Got It!')
});

router.post('/create', function(req, res){
  Link.create(req.body, function(err, link){
   console.log('link created: ', link);
   res.status((err) ? 400 : 200).send( err || link);
  })
})

router.delete('/', function(req, res){
  Link.findOne({linkUrl: req.body.linkUrl}, function(err, link){
    if(err) return res.send(err, 400);
    Tab.find({ links: link._id }, function(err,tabs){
      if(err) return res.send(err, 400);
      tabs.forEach(function(tab){
        tab.links.splice(tab.links.indexOf(link._id),1);
        tab.save(function(err){
          if(err) return res.send('Error saving tags', 400) ;
        })
      })
      res.send('Sucessfully Deleted link', 200)
    })
  })
  //Link.remove({linkUrl: req.body.linkUrl}, function)
})

module.exports = router
