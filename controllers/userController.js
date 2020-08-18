const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const UserDetail = mongoose.model('UserDetail');
const Role = mongoose.model('Role');
const Token = mongoose.model('Token');
const fns = require('date-fns');
const base64Img = require('base64-img');
const slug = require('slug');

// event email
const mailing = require('../mails/authEmail'); // email full authentication

// initiate bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Authentication
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

	if (!user.verifyAt) {
		return res.status(401).json({
			message: 'User not verify, please check your email for confirm',
			status: 401
		});
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

	let dataToken = {
		token: token,
		type: 'login',
		user: user._id,
		status: 'active',
		locale: Intl.DateTimeFormat().resolvedOptions().timeZone,
		expired: fns.addHours(Date.now(), process.env.JWT_EXPIRED)
	};

	const newToken = new Token(dataToken);
	await newToken.save();

	user.password = undefined;

	res.status(200).json({
		message: `${user.name} logged in successfully`,
		data: {
			token: `${token}`,
			user: user,
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

	let hashToken = new Promise((resolve, reject) => {
		let generate = `${req.body.email} ${Date.now()}`;
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(generate, salt, (err, hash) => {
				if (err) throw err;
				resolve(hash);
			});
		});
	});

	let getRole = await Role.findOne({ name: req.body.role });

	req.body.role = getRole._id;
	req.body.token = await hashToken;

	if (!await this.sendVerification(req, res)) {
		return res.status(500).json({
			message: 'Internal Server Error',
			status: 500
		});
	}

	const user = new User(req.body);
	await user.save();

	let dataToken = {
		token: req.body.token,
		type: 'verification',
		user: user._id,
		status: 'active',
		locale: Intl.DateTimeFormat().resolvedOptions().timeZone,
		expired: fns.addHours(Date.now(), 1)
	};

	const token = new Token(dataToken);
	const userDetail = new UserDetail({ user: user._id });

	await token.save();
	await userDetail.save();

	return res.status(200).json({
		message: `Register success.`,
		status: 200
	});
};

exports.sendVerification = async (req, res) => {
	let sending = await mailing.sendVerificationEmail(req.body);
	if (!sending) {
		return false;
	}
	return true;
};

// end Authentication

exports.checkUserToken = async (token, type = '') => {
	let filter = {
		token: token,
		status: 'active',
		expired: { $gte: Date.now() }
	};
	if (type != '') filter.type = type;
	let getTOken = await Token.findOne(filter).populate('user')
		.then((result) => {
			if (result) {
				result.checked = true;
				return result;
			}
			result.error = null;
			result.checked = false;
			return result;
		})
		.catch((err) => {
			let result = {};
			result.error = err;
			result.checked = false;
			return result;
		});
	return getTOken;
};

exports.updateUser = async (req, res) => {
	let newData = {};
	for (const key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			if (key == 'password') {
				let hashPassowrd = new Promise((resolve, reject) => {
					bcrypt.genSalt(saltRounds, (err, salt) => {
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							if (err) throw err;
							resolve(hash);
						});
					});
				});

				req.body.password = await hashPassowrd;
			}
			if (key == 'file') {
				req.body[key] = await uploadFile(req, res);
			}
			newData[key] = req.body[key];
		}
	}
	let userUpdate = await User.findByIdAndUpdate(req.user.id, newData, { new: true, useFindAndModify: false });
	if (!userUpdate) {
		return res.status(400).json({
			message: `Update failed`
		});
	}
	return res.status(200).json({
		message: `Update success`,
		data: userUpdate
	});
};

exports.deleteUser = async (req, res) => {
	return User.findOneAndDelete({ _id: req.user.id })
		.then((del) => {
			if (del) {
				return res.status(200).json({ message: 'Delete success', data: del });
			}
			return res.status(400).json({ message: 'Delete failed, no match id' });
		})
		.catch((err) => {
			return res.status(500).json({ message: err });
		});
};

exports.read = async (req, res) => {
	let filter = {}
	for (const key in req.body) {
		if (object.hasOwnProperty(key) && req.body != '') {
			filter[key] = req.body[key];
		}
	}
	await User.paginate({filter})
		.populate('role')
		.then((data) => {
			res.status(200).json({ message: 'Get list success', data: data });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

exports.profile = async (req, res) => {
	await User.findById(req.user.id)
		.populate('role')
		.then((data) => {
			res.status(200).json({ message: 'Get profile success', data: data });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

const uploadFile = async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		if (!req.body.file) {
			return res.status(400).json({ message: 'No files were uploaded.' });
		}
		let file = await req.body.file;
		let urlImg = new Promise((resolve, reject) => {
			base64Img.img(
				file,
				'./public/profile',
				`${fns.format(new Date(), 'yyyy/MM/dd/')}${slug(Date.now() + ' ' + req.user.id)}`,
				function(err, filePath) {
					if (err) throw err;
					resolve(filePath);
				}
			);
		});
		req.body.photoProfile = urlImg;
		return urlImg;
	}

	let file = req.files.file;
	let ext = file.mimetype.split('/')[1];
	let filePath = `./public/profile/${fns.format(new Date(), 'yyyy/MM/dd/')}${slug(Date.now() + ' ' + req.user.id)}`;

	// // Use the mv() method to place the file somewhere on your server
	file.mv(filePath, function(err) {
		if (err) return res.status(500).send(err);
		return filePath;
	});
};

exports.confirmAccount = async (req, res) => {
	let result = await this.checkUserToken(req.body.token);
	if (!result.checked) {
		return res.status(400).json({
			message: 'Token is expired'
		});
	}
	let tokenUpdate = await Token.findByIdAndUpdate(
		result._id,
		{ status: 'expired' },
		{ new: true, useFindAndModify: false }
	);
	if (!tokenUpdate) {
		return res.status(500).json({
			message: 'Internal Server Error'
		});
	}
	let userUpdate = await User.findByIdAndUpdate(
		result.user,
		{ verifyAt: Date.now() },
		{ new: true, useFindAndModify: false }
	);

	if (!userUpdate) {
		return res.status(400).json({
			message: `Update failed`
		});
	}
	return res.status(200).json({
		message: `Verify success`,
		data: userUpdate
	});
};

exports.verifyToken = async (req, res) => {
	let result = await this.checkUserToken(req.query.token);
	if (!result.checked) {
		return res.status(400).json({
			message: 'Token is expired'
		});
	}
	return res.status(200).json({
		message: 'Token is valid',
		data: result
	});
};

exports.resendVerification = async (req, res) => {
	let hashToken = new Promise((resolve, reject) => {
		let generate = `${req.body.email} ${Date.now()}`;
		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(generate, salt, (err, hash) => {
				if (err) throw err;
				resolve(hash);
			});
		});
	});

	req.body.token = await hashToken;
	let user = await User.findOneAndUpdate(
		{ email: req.body.email },
		{ verifyAt: null },
		{ new: true, useFindAndModify: false }
	);
	let dataToken = {
		token: req.body.token,
		type: 'verification',
		user: user._id,
		status: 'active',
		locale: Intl.DateTimeFormat().resolvedOptions().timeZone,
		expired: fns.addHours(Date.now(), 1)
	};

	const token = new Token(dataToken);

	if (!await this.sendVerification(req, res)) {
		return res.status(500).json({
			message: 'Internal Server Error',
			status: 500
		});
	}
};
