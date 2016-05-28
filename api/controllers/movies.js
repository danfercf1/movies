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
var Movies = require('../models/movie.js');

module.exports = {
    movies: movies,
    moviebyID: moviebyID,
    saveMovie: saveMovie
};

/*
* GET all movies
* */

function movies(req, res) {
    Movies.model.find(function(err, movie) {
        if (err) return next(swe.invalid('movie'));
        if (movie && movie.length > 0 ) {
            res.status(200).send(movie);
        } else {
            res.status(404).send(new Error('Movies not found'));
        }
    });
}

/*
* GET one movie by ID
* */

function moviebyID(req, res) {

    if(typeof req.swagger.params.idMovie.value == "undefined"){
        res.status(404).send(new Error('Movies not found'));
    }else{
        var id = req.swagger.params.idMovie.value;
        Movies.model.findById(id, function(err, movie) {
            if (err) return next(swe.invalid('movie'));
            if (movie) {
                res.status(200).send(movie);
            } else {
                res.status(404).send(new Error('Movies not found'));
            }
        });
    }
}

/*
* POST, save one movie
* */

function saveMovie(req, res) {

    var movie = req.swagger.params.data.originalValue;

    Movies.model.create(JSON.parse(movie), function (err, movie){
        if(err){
            res.status(200).send(new Error(err));
        }else{
            res.status(200).send({"message":"Data saved"});
        }
    });
}
