const transporter = require('../config/mail');
const mailOptions = {
	from: process.env.EMAIL_ADMIN,
	to: '',
	subject: '',
	text: '',
	html: ''
};

exports.sendEmailRegistration = (data) => {
	mailOptions.subject = data.subject;
	mailOptions.to = data.email;
	mailOptions.text = data.text;
	mailOptions.html = data.html;

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
				resolve(false);
			} else {
				console.log('Email sent: ' + info.response);
				resolve(true);
			}
		});
	});
};

exports.sendEmailForgetPassowrd = (data) => {
	mailOptions.subject = data.subject;
	mailOptions.to = data.email;
	mailOptions.text = data.text;
	mailOptions.html = data.html;

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
				resolve(false);
			} else {
				console.log('Email sent: ' + info.response);
				resolve(true);
			}
		});
	});
}