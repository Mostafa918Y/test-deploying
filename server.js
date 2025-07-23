const connectDB = require('./config/db');
require('dotenv').config();
 
const express = require('express');
const app = express();
app.use(express.json());


app.get('/hello',(req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})
