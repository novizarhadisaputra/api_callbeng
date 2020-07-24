const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const base64Img = require('base64-img');
const fileUpload = require('express-fileupload');
const slug = require('slug')

exports.getCategory = async (req, res) => {};

exports.postCategory = async (req, res) => {
	uploadFile(req, res);
};

exports.updateCategory = async (req, res) => {};

exports.deleteCategory = async (req, res) => {};

const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
		if (!req.body.file) {
			return res.status(400).json({ message: 'No files were uploaded.' });
		}
		base64Img.img(req.body.file, './public', `${Date().now}-${req.Category_id}`, function(err, filePath) {
			const pathArray = filePath.split('/');
			const fileName = pathArray[pathArray.length - 1];

			let CategoryUpdate = Category.findByIdAndUpdate(req.Category_id, { image: filePath });
			return res.status(200).json({
				message: `Category`,
				data: CategoryUpdate
			});
		});
	}
	let file = req.files.file;
    let ext = file.mimetype.split('/')[1];
    let filePath = `./public/${slug(Date().now +' '+req.Category_id)}.${ext}`

	// Use the mv() method to place the file somewhere on your server
	file.mv(filePath, function(err) {
		if (err) return res.status(500).send(err);
		// let CategoryUpdate = Category.findByIdAndUpdate(req.Category_id, { image: filePath });
		// return res.status(200).json({
		// 	message: `Category`,
		// 	data: CategoryUpdate
		// });
	});
};
