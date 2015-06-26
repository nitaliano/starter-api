var util = require('util'),
	Response = require('../http/response'),
	Router = require('../core/router'),
	logger = require('../core/logger');

module.exports = AbstractController;

function AbstractController(namespace) {
	// TODO: add apiPrefix to env file
	this._apiPrefix = 'api/v1';
	this._router = new Router();
	this._namespace = namespace;
	this.routes();
}

AbstractController.prototype.routes = function () {
	logger.error(this._namespace, util.format('Child must implement %s', 'routes'));
};

AbstractController.prototype.getRouter = function () {
	return this._router.getInstance();
};

AbstractController.prototype.setRoute = function (url) {
	return this._router.handle(util.format('/%s/%s', this._apiPrefix, url));
};

AbstractController.prototype.sendError = function (errorCode, res) {
	logger.error(this._namespace, errorCode);
	res.status(500);
	res.json(new Response(errorCode, null));
};

AbstractController.prototype.sendData = function (data, res) {
	res.status(200);
	res.json(new Response(null, data));
};