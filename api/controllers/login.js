var mongoose = require('mongoose'),
	util = require('util'),
	errorCodes = require('../common/http/errorcodes'),
	AbstractController = require('../common/controllers/abstractcontroller'),
	jwt = require('jsonwebtoken'),
	UserModel = mongoose.model('User');

module.exports = LoginController;

function LoginController() {
	LoginController.super_.call(this, 'controllers/login', { overrideApiPrefix: true });
}

util.inherits(LoginController, AbstractController);

LoginController.prototype.routes = function () {
	this.setRoute('login').post(this.login.bind(this));
};

LoginController.prototype.login = function (req, res) {
	var self = this;
	
	if (!req.body.email) {
		this.sendError(errorCodes.INVALID_USER_ID);
		return;
	}
	
	UserModel.findOne({ email: req.body.email }, function (err, user) {
		if (err || !user) {
			self.sendError(errorCodes.USER_NOT_FOUND, res);
			return;
		}


		user.authenticate(req.body.password, function (err, isValidPassword) {
			if (err || !isValidPassword) {
				self.sendError(errorCodes.INVALID_USER_PASSWORD, res);
				return;
			}
			self.sendData(self._createToken(user), res);
		});
	});
};

LoginController.prototype._createToken = function (user) {
	// TODO: Use a key eventually instead of a secret
	var d = new Date();
console.log(process.env.TOKEN_ALG, typeof process.env.TOKEN_ALG);
	return {
		token: jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {
			algorthim: process.env.TOKEN_ALG,
			expiresInSeconds: d.setMinutes(d.getMinutes() + 5) / 1000
		})
	};
};