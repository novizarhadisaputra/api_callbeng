const mongoose = require('mongoose');
const softDelete = require('mongoose-softdelete');
const { mongooseErrors } = require('../handlers/errorHandlers');
const userDetailSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: 'User is required',
			ref: 'User'
		},
		photoProfile: {
			type: String,
			default: null
		},
		nik: {
			type: String,
			default: null
		},
		address: {
			type: String,
			default: null
		},
		province: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: 'Province'
		},
		city: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: 'City'
		},
		district: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: 'District'
		},
		subdistrict: {
			type: mongoose.Schema.Types.Object,
			default: null,
			ref: 'SubDistrict'
		},
		sex: {
			type: Boolean,
			default: null
		},
		religion: {
			type: String,
			default: null
		},
		verifyAt: { type: Date, default: null },
		activeAt: { type: Date, default: null }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

userDetailSchema.plugin(softDelete);

module.exports = mongoose.model('UserDetail', userDetailSchema);
