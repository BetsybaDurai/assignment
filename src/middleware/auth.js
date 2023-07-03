const jwt = require("jsonwebtoken")
const User = require('../models/registration')
const config=require('../middleware/config')
const auth = async (req, res, next) => {

    // console.log('auth middleware')

    const token =req.header('x-access-token')
    // console.log("token "+token)
        
    if (!token)
        return res.status(400).send({message: "No token provided"})
    
    jwt.verify(token, config.jwtsecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorised" })
        }
        else {
            req.email = decoded.email; 
            next()
        }
    })
   
}

module.exports = auth;