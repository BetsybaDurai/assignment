const mongoose = require('mongoose');
const validator = require('validator');


const registrationSchema=new mongoose.Schema({
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
        type: String,
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

registrationSchema.pre('save', async function (next) {
    const register = this
    console.log('just before saving')
    next()
})

const Registration = mongoose.model('Registration', registrationSchema)

module.exports = Registration;

// const registrationSchema = yup.object({
//     FirstName: yup.string().required().trim(),
//     LastName: yup.string().required().trim(),
//     Email: yup.string().required().trim().lowercase().email(),
//     Password: yup.string().required().min(7).trim().lowercase().includes(),
//     AddressLine1: yup.string().required(),
//     City: yup.string().required().trim(),
//     State: yup.string().required().trim(),
//     Zip: yup.number().required().trim()
// });