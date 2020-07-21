const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const userSchema = mongoose.Schema(
	{
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
		},
		role: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User role is required',
			ref: 'Role'
		},
		verifyAt: { type: Date, default: null },
		activeAt: { type: Date, default: null }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

userSchema.plugin(softDelete);

module.exports = mongoose.model('User', userSchema);
