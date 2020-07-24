const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const tagSchema = mongoose.Schema(
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

tagSchema.plugin(softDelete);

module.exports = mongoose.model('Tag', tagSchema);
