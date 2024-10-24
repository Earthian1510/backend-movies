const express = require('express')
const cors = require('cors')

const app = express()

const { MovieDB } = require('./models/movies.model')
const { initializeDatabase } = require('./db/db.connection')

app.use(cors())
app.use(express.json())

initializeDatabase()

app.get("/", (req, res) => {
    res.send("Hello, Express!")
})

// GET API 
app.get("/movies", async (req, res) => {
    try{
        const movies = await MovieDB.find()
        res.json(movies)
    }
    catch(error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.get("/movies/:id", async (req, res) => {
    const movieId = req.params.id 
    try{
        const movie = await MovieDB.findById(movieId)
        if(!movie) {
            res.status(404).json({error: "Movie not found"})
        }
        res.status(200).json(movie)
    }
    catch(error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// POST API
app.post("/movies", async (req, res) => {
    const { title, director, releaseYear, rating, plot } = req.body 
    try{
        const newMovie = new MovieDB({ title, director, releaseYear, rating, plot })
        await newMovie.save()
        res.status(201).json(newMovie)
    }
    catch(error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// PUT API 
app.put("/movies/:id", async (req, res) => {

    const movieData = req.body 
    const movieId = req.params.id

    try{

        const updatedMovie = await MovieDB.findByIdAndUpdate(movieId, movieData, {new: true})
        if(!updatedMovie) {
            return res.status(404).json({message: "Movie not found"})
        }
        
        res.status(200).json(updatedMovie)

    }
    catch(error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

// DELETE API
app.delete("/movies/:id", async (req, res) => {
    const movieId = req.params.id 
    try{
        const deletedMovie = await MovieDB.findByIdAndDelete(movieId)
        if(!deletedMovie) {
            return res.status(404).json({ error: "Movie not found" })
        }
        res.status(200).json({message: "Movie deleted successfully", movie: deletedMovie})
    }
    catch(error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
