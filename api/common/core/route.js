var methods = ['get', 'post', 'put', 'delete'];

module.exports = Route;

function Route(route) {
	this._route = route;
}

methods.forEach(function (method) {
	Route.prototype[method] = function (fn) {
		this._route[method](fn);
		return this;
	};
});