/**
 * Created by daniel on 26/05/2016.
 */
/**
 * The schema and model for movie data
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var genreSchema = new mongoose.Schema({
    name: String,
    status: String
});

exports.model = mongoose.model('genre', genreSchema);
