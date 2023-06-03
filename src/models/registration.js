const mongoose = require('mongoose');
const validator = require('validator');
const Registration = mongoose.model('Registration', {
    FirstName: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    },
    LastName: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    },
    Email: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    Password: {
        type: String,
        required: true,
        minLength: 7, //not working for validation in postman
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not be a string of password')
            }
        }
    },
    AddressLine1: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:false
    },
    City: {
        type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    },
    State: {
         type: String, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    }, 
    Zip: {
         type: Number, // Booleans, dates ,array, binary data, object IDs and more
        required: true,
        trim:true
    }
})

module.exports = Registration;