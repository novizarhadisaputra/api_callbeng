const mongoose = require('mongoose');
const kittySchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    passowrd: {
        type: String,
        required: 'Password is required'
    },
    phone: {
        type: String,
        required: 'Phone is required'
    }
});