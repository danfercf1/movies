'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    api_key: function (req, authOrSecDef, scopesOrApiKey, cb){

      var Users = require('./api/models/users.js');

      Users.model.findOne({'api_key': scopesOrApiKey}, 'name', function (err, api_user) {
        if(err){
          cb(new Error(err));
        }
        if(api_user){
          cb(null);
        }else{
          cb(new Error('access denied!'));
        }
      });
    }
  }
};

var mongoose = require('mongoose'),
    // param = require("./Common/node/paramTypes.js"),
    sw = require('swagger-node-express'),
    colors = require('colors'),
    swe = sw.errors,
    mongo_config = require('./config/config'),
    util = require('util'),
    db = mongoose.connection;

SwaggerExpress.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  db.on('error', function() {
    console.log('Database connection error'.red);
  });
  db.on('connecting', function () {
    console.log('Database connecting'.cyan);
  });
  db.once('open', function() {
    console.log('Database connection established'.green);
  });
  db.on('reconnected', function () {
    console.log('Database reconnected'.green);
  });

  mongoose.connect(mongo_config.db_url, {server: {auto_reconnect: true}});

  var port = process.env.PORT || 10010;

  app.listen(port);

  /*if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }*/
});
