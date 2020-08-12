const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const locationSchema = mongoose.Schema(
	{
		user: {
			type: String,
			required: 'Name is required'
		},
		lat: {
			type: mongoose.Schema.Types.Decimal128,
			required: 'Lattitude is required',
		},
		long: {
			type: mongoose.Schema.Types.Decimal128,
			required: 'Lattitude is required',
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

locationSchema.plugin(softDelete);

module.exports = mongoose.model('Location', locationSchema);
