const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const notificationSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    ref: { // _id reference detail notification
        type: String
    },
    type: {
        type: String
    },
    isRead: {
        type: Boolean
    }
}, {
    timestamps: true,
    versionKey: false,
});

notificationSchema.plugin(softDelete)

module.exports = mongoose.model('Notification', notificationSchema);