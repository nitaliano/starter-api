var jwt = require('jsonwebtoken'),
	Response = require('../common/http/response'),
	errorCodes = require('../common/http/errorcodes');

module.exports = function (req, res, next) {
	jwt.verify(req.query.token, process.env.TOKEN_SECRET, function (err) {
		if (err) {
			res.status(500);
			res.json(new Response(errorCodes.INVALID_TOKEN));
			return;
		}
		return next();
	});
};