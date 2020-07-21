const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const messageSchema = mongoose.Schema(
	{
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
	},
	{
		timestamps: true,
		versionKey: false
	}
);

messageSchema.plugin(softDelete);

module.exports = mongoose.model('Message', messageSchema);
