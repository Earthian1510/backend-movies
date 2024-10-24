const mongoose = require('mongoose')
require('dotenv').config()
const mongo_URI = process.env.MONGO_DB 

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if(connection){
            console.log("Connected to Database")
        }
    }
    catch(error){
        console.log("Connection Failed", error)
    }
}

module.exports = { initializeDatabase }