const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
    //name, year, genre
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

const Film = mongoose.model('Film', FilmSchema);
module.exports = Film;