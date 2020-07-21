const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false, // use SSL
	port: 587, // port for secure SMTP
	auth: {
		user: process.env.EMAIL_MASTER,
		pass: process.env.PASSWORD_MASTER
	},
	tls: {
		rejectUnauthorized: false
	}
});
module.exports = transporter;
