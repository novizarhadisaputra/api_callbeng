const mongoose = require('mongoose');
const { mongooseErrors } = require('../handlers/errorHandlers');
const chatRoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);