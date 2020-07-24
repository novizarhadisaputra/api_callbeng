const transporter = require('../config/mail');
const fs = require('fs-extra');

const mailOptions = {
	from: process.env.EMAIL_ADMIN,
	to: '',
	subject: '',
	text: '',
	html: ''
};

exports.sendEmailRegistration = async (data) => {
	mailOptions.subject = data.subject;
	mailOptions.to = data.email;
	mailOptions.text = data.text;
	mailOptions.html = await readFileHtml(`${data.path_html}.html`, data);

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
};

exports.sendEmailForgetPassowrd = async (data) => {
	mailOptions.subject = data.subject;
	mailOptions.to = data.email;
	mailOptions.text = data.text;
	mailOptions.html = await readFileHtml(`${data.path_html}.html`, data);

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

async function readFileHtml(path, data = null) {
	let cb = await new Promise((resolve, reject) => {
		fs
			.readFile(path, 'utf8')
			.then((result) => {
				if (data != null) {
					for (const d in data) {
						result = result.toString().replace(`this.${d}`, data[`${d}`]);
					}
				}
				resolve(result)
			})
			.catch((err) => {
				reject(err);
			});
	});
	return cb
}
