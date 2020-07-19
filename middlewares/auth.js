
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw 'Unauthorized';
		const token = await req.headers.authorization.split(' ')[1];
		const data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {		
			if (err) {
				res.status(401).json({
					message: err,
					status: 401
				});
			}
			return decoded;
		});
		
		next();
	} catch (error) {
		res.status(401).json({
			message: error,
			status: 401
		});
	}
};
