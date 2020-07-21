const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const articleSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: 'Title is required'
		},
		publisher: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User is required',
			ref: 'User'
		},
		slug: {
			type: String,
			required: 'Slug is required'
		},
		image: {
			type: String,
			required: 'File image is required'
		},
		content: {
			type: String,
			required: 'Content is required'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

articleSchema.plugin(softDelete);

module.exports = mongoose.model('Article', articleSchema);
