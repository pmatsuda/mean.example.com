var express = require('express');
var router = express.Router();
var Users = require('../models/users');

router.get('/register', function(req, res){
  res.render('users/register',{
    title: 'Create an Account' 
  });
});

module.exports = router;