var config = {};
config.mongodb = 'mongodb://localhost/mean-cms';
module.exports = config;

//Session configuration object
config.session = {};

//Cookie configuration object
config.cookie = {};

//Create a random string to sign the session data
//Bigger is better, more entropy is better
//The is OK for dev, change for production
config.session.secret = '7j&1tH!cr4F*1U';

//Define the domain for which this cookie is to be set
config.cookie.domain = 'localhost';