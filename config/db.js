const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
const connectDB = ()=>{
    mongoose.connect(MONGO_URI)
    .then(()=>{console.log("DB Connected successfully")})
    .catch((err)=>{console.log(`DB CONNECTED ERROR:${err}`)})
}

module.exports = connectDB