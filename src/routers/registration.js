const express = require('express')
const connectDB=require('../db/mongoose')
const Registration = require('../models/registration')
const config  = require('../middleware/config.js')
connectDB();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const auth= require('../middleware/auth')


const router = new express.Router()
router.post('/registration', async (req, res) => {
    req.body.Password = await bcrypt.hashSync(req.body.Password, '8')
    const registration = new Registration(req.body);

    try {
        await registration.save()
        res.status(200).send(registration)
    } catch (e) {
        // console.log(e)
        res.status(400).send(e)
    }
   
})

router.post('/user',  auth, async (req, res, next) => {
    // console.log(req.body)
    const email = req.body.email; //didn't change to object or string
    try {
        const user = await Registration.findOne({ Email: email })
        res.send(user)
    } catch (e) {
        console.log(e)
    }
   
})

router.post('/login', async (req, res) => {
    const email = req.body.email; //didn't change to object or string
    const password = req.body.password;
    try {
        const login = await Registration.findOne({ Email: email })
       
        if (login) {
            const isMatch = bcrypt.compareSync(password, login.Password)        
            var token = jwt.sign({ email: login.Email }, config.jwtsecret, { expiresIn: 86400 })
         

            if (isMatch) {
                login.accessToken = token
                // console.log(login.accessToken)
                res.status(201).send({
                    email: login.Email,
                    accessToken: token,
                    name: login.FirstName
                })
                
            } else {
                res.status(400).send({ message: "Password is mismatch. Try again" })
            }
        } else {
            res.status(400).send({ message: "Email is mismatch. Try again" })
        }
    } catch (e) {
        res.status(500).send({ message: "Unable to login. Username or Password is mismatch" } +e)
    }

})

router.post('/update', async (req, res) => {
    // console.log(req.body) 
    const email = req.body.email; //didn't change to object or string
    const password = req.body.password;
    const addressline1 = req.body.addressline1;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    try {
        const updateDetails = await Registration.findOneAndUpdate({ Email: email, Password: password },
        { "$set": { "AddressLine1": addressline1, "City": city, "State": state, "Zip": zip } })
        res.status(201).send(updateDetails)
    } catch (e) {
         res.status(500).send(e)
     }
    
})

module.exports = router