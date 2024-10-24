const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: String,
    director: String,
    releaseYear: Number,
    rating: String,
    plot: String
})

const MovieDB = mongoose.model("MovieDB", moviesSchema)
module.exports = { MovieDB }