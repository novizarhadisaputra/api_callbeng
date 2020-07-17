const mongoose = require('mongoose');
const { mongooseErrors } = require('../handlers/errorHandlers');
const messageSchema = mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Chat room is required',
        ref: 'ChatRoom'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User data is required',
        ref: 'User'
    },
    message: {
        type: String,
        required: 'Message field is required'
    }
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Message', messageSchema);