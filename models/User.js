const mongoose = require('mongoose');
const { mongooseErrors } = require('../handlers/errorHandlers');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    phone: {
        type: String,
        required: 'Phone is required'
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('User', userSchema);