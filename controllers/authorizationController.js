const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Role = mongoose.model('Role');
const Token = mongoose.model('Token');
const fns = require('date-fns');

// initiate bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = async (req, res) => {};

exports.read = async (req, res) => {};

exports.update = async (req, res) => {};

exports.delete = async (req, res) => {};
