
'use strict';

var express = require('express');
var router = express.Router();
var Link = require('../models/link')
var Tab = require('../models/tab')

router.get('/', function(req,res){
  Link.find({}, function(err, links){ 
    res.status(err ? 400 : 200).send(err || links);
  }).sort({_id: -1});
});



router.post('/create', function(req, res){
  Link.create(req.body, function(err, link){
   console.log('link created: ', link);
   res.status((err) ? 400 : 200).send( err || link);
  })
})

router.delete('/', function(req, res){
  Link.removeLink(req, function(err, removedLink){
    res.status(err ? 400 : 200).send(err || removedLink);
  });
})

module.exports = router
