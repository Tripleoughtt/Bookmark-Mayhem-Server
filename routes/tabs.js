'use strict';

var express = require('express');
var router = express.Router();
var Tab = require('../models/tab')

router.get('/', function(req,res){
  Tab.find({}, function(err, tabs){
    res.status(err ? 400 : 200).send( err || tabs )
  });
});

router.delete('/', function(req, res){
  var tabNameToRemove = req.body
  console.log(tabNameToRemove)
  Tab.remove({tabName: tabNameToRemove.name }, function(err, removedTab){
    console.log('tag Removed:  ', removedTab);
    res.status((err) ? 400 : 200).send( err || removedTab );
  })
})

router.post('/create', function(req, res){
  Tab.create(req.body, function(err, tab){
    console.log('tag created: ', tab);
    res.status((err) ? 400 : 200).send( err || tab );
  })
})

module.exports = router
