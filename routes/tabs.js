'use strict';

var express = require('express');
var router = express.Router();
var Tab = require('../models/tab')
var Link = require('../models/link')

router.get('/', function(req,res){
  Tab.find({}, function(err, tabs){
    res.status(err ? 400 : 200).send( err || tabs )
  }).populate('links', 'linkUrl')
});

router.put('/', function(req, res){
    Tab.updateTab(req, function(err, updatedTab){
      res.status(err ? 400 : 200).send( err || 'Tag Saved!', updatedTab)
  });
});

router.post('/addLink', function(req,res){
  Tab.addLinkToTab(req, function(err, foundTab){
    res.status(err ? 400 : 200).send(err ||  foundTab)
  })
});

router.post('/delete', function(req, res){
    Tab.removeTab(req.body, function(err, removedTab){
      res.status(err ? 400 : 200).send(err || removedTab); 
    });
})

router.post('/create', function(req, res){
  Tab.create(req.body, function(err, tab){
    res.status((err) ? 400 : 200).send( err || tab );
  })
})

module.exports = router
