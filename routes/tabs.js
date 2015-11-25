'use strict';

var express = require('express');
var router = express.Router();
var Tab = require('../models/tab')

router.get('/', function(req,res){
  Tab.find({}, function(err, tabs){
    res.status(err ? 400 : 200).send( err || tabs )
  });
});

//router

router.delete('/', function(req, res){
  var tabToRemove = req.body
  Tab.findOne({tabName: tabToRemove.tabName }, function(err, foundTab){
    console.log("Found Tbabababa", foundTab)
    if(err) {return res.send(err, 400)}
    if(foundTab.links.length){
      return res.send('You Cannot Delete A Tab With Links Attached!')
    }
  Tab.remove({tabName: tabToRemove.tabName }, function(err, removedTab){
    console.log('tag Removed:  ', removedTab);
    res.status((err) ? 400 : 200).send( err || removedTab );
  })
  });
})

router.post('/create', function(req, res){
  Tab.create(req.body, function(err, tab){
    console.log('tag created: ', tab);
    res.status((err) ? 400 : 200).send( err || tab );
  })
})

module.exports = router
