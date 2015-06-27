var util = require('util'),
	path = require('path'),
	Response = require('../http/response'),
	Router = require('../core/router'),
	logger = require('../core/logger');

module.exports = AbstractController;

function AbstractController(namespace, options) {
	this._router = new Router();
	this._namespace = namespace;
	this._options = options || {};
	this.routes();
}

AbstractController.prototype.routes = function () {
	logger.error(this._namespace, util.format('Child must implement %s', 'routes'));
};

AbstractController.prototype.getRouter = function () {
	return this._router.getInstance();
};

AbstractController.prototype.setRoute = function (url) {
	return this._router.handle(path.join(this._options.overrideApiPrefix ? '/' : process.env.API_PREFIX, url));
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