var Route = require('./route'),
	express = require('express');

module.exports = Router;

function Router() {
	this._router = express.Router();
}

Router.prototype.getInstance = function () {
	return this._router;
};

Router.prototype.handle = function (url) {
	return new Route(this._router.route(url));
};