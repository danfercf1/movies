/**
 * Created by daniel on 26/05/2016.
 */
/**
 * The schema and model for movie data
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var movieSchema = new mongoose.Schema({
    title: String,
    genres: Array,
    director: String,
    starring: Array,
    supporting_actors: Array,
    studio: String,
    mpaa_rating: String,
    status: String
});

/*exports.def =
{
    "Movie":{
        "id":"Movie",
        "required": ["title", "director", "studio", "mpaa_rating", "status"],
        "properties":{
            "title":{
                "type":"string",
                "description": "Movie title"
            },
            "genres":{
                "type":"array",
                "description": "Genres"
            },
            "director":{
                "type":"string",
                "description": "Name of movie's director"
            },
            "studio":{
                "type":"string",
                "description": "Name of movie's studio"
            },

            "mpaa_rating":{
                "type":"string",
                "description": "MPAA rating"
            },

            "status":{
                "type":"string",
                "description": "Availability status"
            }
        }
    }
};*/

exports.model = mongoose.model('movie', movieSchema);
