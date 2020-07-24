const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const base64Img = require('base64-img');
const fileUpload = require('express-fileupload');
const slug = require('slug')

exports.getTag = async (req, res) => {};

exports.postTag = async (req, res) => {
	uploadFile(req, res);
};

exports.updateTag = async (req, res) => {};

exports.deleteTag = async (req, res) => {};

const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
		if (!req.body.file) {
			return res.status(400).json({ message: 'No files were uploaded.' });
		}
		base64Img.img(req.body.file, './public', `${Date().now}-${req.Tag_id}`, function(err, filePath) {
			const pathArray = filePath.split('/');
			const fileName = pathArray[pathArray.length - 1];

			let TagUpdate = Tag.findByIdAndUpdate(req.Tag_id, { image: filePath });
			return res.status(200).json({
				message: `Tag`,
				data: TagUpdate
			});
		});
	}
	let file = req.files.file;
    let ext = file.mimetype.split('/')[1];
    let filePath = `./public/${slug(Date().now +' '+req.Tag_id)}.${ext}`

	// Use the mv() method to place the file somewhere on your server
	file.mv(filePath, function(err) {
		if (err) return res.status(500).send(err);
		// let TagUpdate = Tag.findByIdAndUpdate(req.Tag_id, { image: filePath });
		// return res.status(200).json({
		// 	message: `Tag`,
		// 	data: TagUpdate
		// });
	});
};
