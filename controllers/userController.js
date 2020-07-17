const mongoose = require('mongoose');
const User = mongoose.model('User');

// initiate bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res) => {
	const { email, password, phone, name } = req.body;
	const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]/;
};

exports.registration = async (req, res) => {
	const { email, password, phone, name } = req.body;
	const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]/;
	if (!emailRegex.test(email)) throw 'Email is not supported from your domain';
	if (password.length < 8) throw 'Password must be atleast 8 Characters long';
	hashPassowrd = new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				if (err) throw 'Bcrypt error';
				resolve(hash);
			});
		});
	});
	req.body.password = await hashPassowrd;
	const user = new User(req.body);

	await user.save();

	res.status(200).json({ status: 200, data: user });
};
