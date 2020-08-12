const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const authorizationSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name is required'
		},
	},
	{
		timestamps: true,
		versionKey: false
	}
);

authorizationSchema.plugin(softDelete);

module.exports = mongoose.model('Authorization', authorizationSchema);
