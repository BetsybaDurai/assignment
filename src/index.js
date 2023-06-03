const express = require("express");
require('./db/mongoose')
const Registration = require('./models/registration')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())  //parse incoming JSON to Object

app.post('/registration', (req, res) => {
    const registration = new Registration(req.body);
    registration.save().then(() => {
        res.send(registration);
    }).catch((e) => {
        res.status(201).status(400).send(e)
    })
})

app.get('/registration/:email', (req, res) => {
    // console.log(req.params)
    const email = req.params.email; //didn't change to object or string

     Registration.findOne({Email:email}).then((data) => { //fetching one registration
         res.send(data)
        //  console.log('data'+data)
    }).catch((e) => {
        res.status(500).send(e)
     })
})

app.get('/login/:email/:password', (req, res) => {
    // console.log(req.params)
    const email = req.params.email; //didn't change to object or string
    const password = req.params.password;

    Registration.findOne({ Email: email, Password: password }).then((data) => { 
        if (!data) {
            res.send('Unable to login. Please check the login details')
        } else {
            res.send('Login successfully')
        }
        //  console.log('data'+data)
    }).catch((e) => {
        res.status(500).send(e)
     })
})

app.get('/update/:email/:password/:addressline1/:city/:state/:zip', (req, res) => {
    // console.log(req.params)
    const email = req.params.email; //didn't change to object or string
    const password = req.params.password;
    const addressline1 = req.params.addressline1;
    const city = req.params.city;
    const state = req.params.state;
    const zip = req.params.zip;
    Registration.findOneAndUpdate({ Email: email, Password: password },
        { "$set": { "AddressLine1": addressline1, "City": city, "State": state, "Zip": zip } }).then((data) => { 
        if (!data) {
            res.status(500).send('Unable to update details.')
        } else {
            res.status(200).send('Details updated successfully'+data)
        }
        //  console.log('data'+data)
    }).catch((e) => {
        res.status(500).send(e)
     })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})