var express = require('express');
var router = express.Router();
var Users = require('../models/users');

// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.get('/app', function(req, res, next) {
  res.render('users/app', { title: 'User Management' });
});

module.exports = router;