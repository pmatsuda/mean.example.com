var express = require('express');
var router = express.Router();
var Users = require('../../models/users');

router.get('/', function(req, res, next) {
  Users.find({},function(err, users){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'users': users});
  });
});

router.post('/', function(req, res) {
  Users.create(new Users({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user){
    
    if(err){
      return res.json({success: false, user: req.body, error: err});
    }

    return res.json({success: true, user: user});
    
  });
});

module.exports = router;