/**
 * Created by daniel on 26/05/2016.
 */
/**
 * The schema and model for user data
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    api_key: String,
    api_secret: String,
    status: String,
    created_date: String
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

exports.model = mongoose.model('user', userSchema);
