'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 */

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

 It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var Users = require('../models/users.js');
var uuid = require('node-uuid');
var crypto = require('crypto');

module.exports = {
    users: users,
    userbyID: userbyID,
    saveUser: saveUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};

/*
* GET all users
* */

function users(req, res) {
    Users.model.find(function(err, user) {
        if (err) return next(swe.invalid('user'));
        if (user && user.length > 0 ) {
            res.status(200).send(user);
        } else {
            res.status(404).send(new Error('Users not found'));
        }
    });
}

/*
* GET one user by ID
* */

function userbyID(req, res) {

    if(typeof req.swagger.params.idUser.value == "undefined"){
        res.status(404).send(new Error('Users not found'));
    }else{
        var id = req.swagger.params.idUser.value;
        Users.model.findById(id, function(err, user) {
            if (err) return next(swe.invalid('user'));
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send(new Error('Users not found'));
            }
        });
    }
}

/*
* POST, save one user
* */

function saveUser(req, res) {

    var user = req.swagger.params.data.originalValue;

    var json_data = JSON.parse(user);

    var api_key = uuid();
    var api_secret = crypto.createHash('sha256').update('salt').digest('hex');

    /*ADD API key and secret*/

    json_data['api_key'] = api_key;
    json_data['api_secret'] = api_secret;
    json_data['status'] = "active";

    Users.model.create(json_data, function (err, user){
        if(err){
            res.status(200).send(new Error(err));
        }else{
            res.status(200).send({"message":"Data saved"});
        }
    });
}

/*
* PUT, update user
* */

function updateUser(req, res) {

    if(typeof req.swagger.params.idUser.value == "undefined"){
        res.status(404).send(new Error('Users not found'));
    }else{
        var id = req.swagger.params.idUser.value;
        var user = req.swagger.params.data.originalValue;

        Users.model.findByIdAndUpdate(id, JSON.parse(user), {}, function(err, user) {
            if (err) return next(swe.invalid('user'));
            if (user) {
                res.status(200).send({"message":"Data saved"});
            } else {
                res.status(404).send(new Error(err));
            }
        });
    }
}


/*
* DELETE, delete user
* */

function deleteUser(req, res) {

    if(typeof req.swagger.params.idUser.value == "undefined"){
        res.status(404).send(new Error('Users not found'));
    }else{
        var id = req.swagger.params.idUser.value;

        Users.model.remove({_id: id}, function(err) {
            if (!err) {
                res.status(200).send({"message":"Data removed"});
            }else{
                res.status(404).send(new Error(err));
            }
        });
    }
}

