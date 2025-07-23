const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
require('dotenv').config()
function generateAccessToken(userID,role){
    let payload ={userID,role}
   return jwt.sign(payload,process.env.ACCESS_SECRET,{expiresIn:'1h'})
   
}

function generateRefreshToken(userID){
    let payload = {userID}
    return jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'1y'})
}

module.exports = {generateAccessToken, generateRefreshToken}