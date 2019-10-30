var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');

router.get('/app', function(req, res, next) {
  res.render('articles/app', { title: 'AMS'});
});

router.get('/', function(req, res, next) {
  Articles.find({}, function (err, articles) {
    if (err) {
      return res.json({ 'success': false, 'error': err });
    }
    res.render('articles/index', {title: 'Blog Home', articles:articles});
  });  
});

router.get('/view/:slug', function(req, res, next) {
  //var articleId = req.params.slug;

  Articles.findOne({slug:req.params.slug},function(err, articles){
    if (err) {
      return res.json({ 'success': false, 'error': err });
    }
    res.render('articles/view', { title: 'Blog Article', article:articles});
  }); 
});

module.exports = router;