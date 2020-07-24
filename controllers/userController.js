const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Role = mongoose.model('Role');

// event email
const mailing = require('../mails/authEmail'); // email full authentication

// initiate bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res) => {
	const { email, password, phone } = req.body;
	const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]/;
	if (!emailRegex.test(email)) throw 'Email is not supported from your domain.';

	let user = await User.findOne({
		$or: [ { email: req.body.email }, { phone: req.body.phone } ]
	})
		.then((users) => {
			return users;
		})
		.catch((error) => {
			res.status(500).json({
				message: error,
				status: 500
			});
		});

	if (!user) {
		if (phone == undefined) {
			throw 'Email not found.';
		}
		throw 'Phone not found.';
	}
	let checkPassowrd = await bcrypt
		.compare(req.body.password, user.password)
		.then((match) => {
			return match;
		})
		.catch((error) => {
			res.status(500).json({
				message: error,
				status: 500
			});
		});
	if (!checkPassowrd) throw 'Password not match.';

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRED}h` });
	const data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: err,
				status: 401
			});
		}
		return decoded;
	});

	res.status(200).json({
		message: `${user.name} logged in successfully`,
		data: {
			token: `${token}`,
			loggedIn: new Date((await data.iat) * 1000),
			expiresIn: new Date((await data.exp) * 1000)
		}
	});
};

exports.registration = async (req, res) => {
	const { email, password, phone, name, role } = req.body;
	const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
	if (!emailRegex.test(email)) throw 'Email is not supported from your domain';
	let emailCheck = await User.findOne({ email });
	if (emailCheck) throw 'Email already exists.';
	let phoneCheck = await User.findOne({ phone });
	if (phoneCheck) throw 'Phone already exists.';
	if (password.length < 8) throw 'Password must be atleast 8 Characters long.';

	let hashPassowrd = new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err;
				resolve(hash);
			});
		});
	});

	req.body.password = await hashPassowrd;

	let getRole = await Role.findById(req.body.role)
		.then((role) => {
			return role;
		})
		.catch((err) => {
			res.status(500).json({
				message: err,
				status: 500
			});
		});

	req.body.role = getRole._id;

	let newData = req.body;
	newData.path_html = 'public/email/verification';

	let sending = await mailing.sendEmailRegistration(newData);
	if (!sending) {
		return res.status(500).json({
			message: 'Internal Server Error',
			status: 500
		});
	} 
	const user = new User(req.body);
	await user.save();

	return res.status(200).json({
		message: `Register success.`,
		status: 200,
		data: user
	});
};
