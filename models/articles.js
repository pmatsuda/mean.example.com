var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');

//Create a schema
var Articles = new Schema({
  title: {
    type: String,
    required: [true, 'A title is required']
  },
  slug: {
    type: String,
    required: [true, 'A slug is required'],
    unique: true
  },
  description: String,
  keywords: String,
  body: String,
  published: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date
  }
});

//Auto set the slug prior to validation
Articles.pre('validate', function(next){

  //Do not overwrite the slug if it already exists
  if(this.slug==undefined){
    if(this.title){
      this.slug = slug(this.title).toLowerCase();
    }
  }

  //If no published date has been provided use the current date
  if(this.published==undefined){
    this.modified = new Date().toISOString();
  }

  this.modified = new Date().toISOString();
  next();
});
  
module.exports = mongoose.model('Articles', Articles);