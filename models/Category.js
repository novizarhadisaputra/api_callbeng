const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const caegorySchema = mongoose.Schema(
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

caegorySchema.plugin(softDelete);

module.exports = mongoose.model('Category', caegorySchema);
