const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
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

chatRoomSchema.plugin(softDelete);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);