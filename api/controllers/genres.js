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
var Genres = require('../models/genres.js');

module.exports = {
    genres: genres,
    genrebyID: genrebyID,
    saveGenre: saveGenre,
    updateGenre: updateGenre,
    deleteGenre: deleteGenre
};

/*
* GET all genres
* */

function genres(req, res) {
    Genres.model.find(function(err, genre) {
        if (err) return next(swe.invalid('genres'));
        if (genre && genre.length > 0 ) {
            res.status(200).send(genre);
        } else {
            res.status(404).send(new Error('Genres not found'));
        }
    });
}

/*
* GET one genre by ID
* */

function genrebyID(req, res) {

    if(typeof req.swagger.params.idGenre.value == "undefined"){
        res.status(404).send(new Error('Genres not found'));
    }else{
        var id = req.swagger.params.idGenre.value;
        Genres.model.findById(id, function(err, genre) {
            if (err) return next(swe.invalid('genre'));
            if (genre) {
                res.status(200).send(genre);
            } else {
                res.status(404).send(new Error('Genres not found'));
            }
        });
    }
}

/*
* POST, save one genre
* */

function saveGenre(req, res) {

    var genre = req.swagger.params.data.originalValue;

    Genres.model.create(JSON.parse(genre), function (err, genre){
        if(err){
            res.status(200).send(new Error(err));
        }else{
            res.status(200).send({"message":"Data saved"});
        }
    });
}

/*
* PUT, update genre
* */

function updateGenre(req, res) {

    if(typeof req.swagger.params.idGenre.value == "undefined"){
        res.status(404).send(new Error('Genres not found'));
    }else{
        var id = req.swagger.params.idGenre.value;
        var genre = req.swagger.params.data.originalValue;

        Genres.model.findByIdAndUpdate(id, JSON.parse(genre), {}, function(err, genre) {
            if (err) return next(swe.invalid('genre'));
            if (genre) {
                res.status(200).send({"message":"Data saved"});
            } else {
                res.status(404).send(new Error(err));
            }
        });
    }
}


/*
* DELETE, delete genre
* */

function deleteGenre(req, res) {

    if(typeof req.swagger.params.idGenre.value == "undefined"){
        res.status(404).send(new Error('Genres not found'));
    }else{
        var id = req.swagger.params.idGenre.value;

        Genres.model.remove({_id: id}, function(err) {
            if (!err) {
                res.status(200).send({"message":"Data removed"});
            }else{
                res.status(404).send(new Error(err));
            }
        });
    }
}

