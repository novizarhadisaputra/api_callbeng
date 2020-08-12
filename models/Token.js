const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const tokenSchema = mongoose.Schema(
	{
		token: {
			type: String,
			required: 'Token is required'
		},
		type: {
			type: String,
			required: 'Type is required'
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User role is required',
			ref: 'User'
		},
		status: {
			type: String,
			required: 'Status is required'
		},
		locale: {
			type: String,
			required: 'Locale is required'
		},
		expired: {
			type: Date,
			required: 'Expired is required'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

tokenSchema.plugin(softDelete);

module.exports = mongoose.model('Token', tokenSchema);
