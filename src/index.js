const express = require("express");
const dotenv = require('dotenv').config;
const config  = require('./middleware/config.js')
const jwt = require("jsonwebtoken");
const RegisterRouter = require("./routers/registration")

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res,next) => {
    // console.log(req.method, req.path)
    if (req.method === 'GET') {
        console.log("GET requests are disabled")
    }
    else  {
        next() // postman will work after using next() 
    }
})

app.use(express.json())
app.use(RegisterRouter)

app.listen(port, () => {
    console.log('Server is up on port '+port)
})
