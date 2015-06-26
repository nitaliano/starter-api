var mongoose = require('mongoose'),
	util = require('util'),
	errorCodes = require('../common/http/errorcodes'),
	AbstractController = require('../common/controllers/abstractcontroller'),
	UserModel = mongoose.model('User');

module.exports = UserController;

function UserController() {
	UserController.super_.call(this, 'controllers/user');
}

util.inherits(UserController, AbstractController);

UserController.prototype.routes = function () {
	this.setRoute('user')
		.post(this.create.bind(this));
		
	this.setRoute('user/:id')
		.get(this.get.bind(this))
		.put(this.update.bind(this))
		.delete(this.delete.bind(this));
};

UserController.prototype.get = function (req, res) {
	var self = this;
	
	if (!req.params.id) {
		this.sendError(errorCodes.INVALID_USER_ID);
		return;
	}
	
	UserModel.findOne({ _id: req.params.id }, function (err, user) {
		if (err || !user) {
			self.sendError(errorCodes.USER_NOT_FOUND, res);
			return;
		}
		self.sendData(user, res);
	});
};

UserController.prototype.create = function (req, res) {
	var self = this;
	
	if (!req.body.email || !req.body.password) {
		this.sendError(errorCodes.INVALID_USER_CREATE_DATA, res);
		return;
	}
	
	UserModel.findOne({ email: req.body.email }, function (err, user) {
		if (user) {
			self.sendError(errorCodes.USER_ALREADY_EXISTS, res);
			return;
		}
		
		new UserModel(req.body).save(function (err, user) {
			if (err) {
				self.sendError(errorCodes.UNABLE_TO_CREATE_USER, res);
				return;
			}
			self.sendData(user, res);
		});
	});
};

UserController.prototype.delete = function (req, res) {
	var self = this;
	
	if (!req.params.id) {
		this.sendError(errorCodes.INVALID_USER_ID, res);
		return;
	}
	
	UserModel.findOneAndRemove({ _id: req.params.id }, function (err, user) {
		if (err || !user) {
			self.sendError(errorCodes.UNABLE_TO_REMOVE_USER, res);
			return;
		}
		self.sendData(user, res);
	});
};

UserController.prototype.update = function (req, res) {
	var self = this, updates;
	
	if (!req.params.id) {
		this.sendError(errorCodes.INVALID_USER_ID, res);
		return;
	}

	updates = {};
	if (req.body.name && (req.body.name.first || req.body.name.last)) {
		if (req.body.name.first) {
			updates['name.first'] = req.body.name.first;
		}

		if (req.body.name.last) {
			updates['name.last'] = req.body.name.last;
		}
	}

  UserModel.findOneAndUpdate({ _id: req.params.id }, updates, function (err, user) {
		if (err || !user) {
			self.sendError(errorCodes.UNABLE_TO_UPDATE_USER, res);
			return;
		}
		self.sendData(user, res);
	});
};