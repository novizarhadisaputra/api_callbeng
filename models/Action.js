const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const actionSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name is required'
		},
	},
	{
		role: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User role is required',
			ref: 'Role'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

actionSchema.plugin(softDelete);

module.exports = mongoose.model('Action', actionSchema);
