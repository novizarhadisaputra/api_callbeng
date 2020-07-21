const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const roleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name role is required'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

roleSchema.plugin(softDelete);

module.exports = mongoose.model('Role', roleSchema);
