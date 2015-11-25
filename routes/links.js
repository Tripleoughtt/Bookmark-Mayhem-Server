
'use strict';

var express = require('express');
var router = express.Router();
var Link = require('../models/link')

router.get('/', function(req,res){
  res.send('We Got It!')
});

router.post('/create', function(req, res){
  Link.create(req.body, function(err, link){
   console.log('link created: ', link);
   res.status((err) ? 400 : 200).send( err || link);
  })
})

module.exports = router
