const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Role = mongoose.model('Role');
const Token = mongoose.model('Token');
const fns = require('date-fns');
const slug = require('slug');

// event email
const mailing = require('../mails/authEmail'); // email full authentication

// initiate bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = async (req, res) => {};

exports.read = async (req, res) => {
	await User.find({})
		.populate('author')
		.then((data) => {
			res.status(200).json({ message: 'Get article success', data: data });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

exports.myArticle = async (req, res) => {
	await User.find({ author: req.user.id })
		.populate('author')
		.then((data) => {
			res.status(200).json({ message: 'Get my article success', data: data });
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
};

exports.update = async (req, res) => {};

exports.delete = async (req, res) => {};
