module.exports = new Logger();

function Logger() {};

Logger.prototype.warn = function (namespace, data) {
	// Log the warning data to the filesystem
	console.info(namespace, data);
};

Logger.prototype.debug = function (namespace, data) {
	// Log the debug data to the filesystem
	console.debug(namespace, data);
};

Logger.prototype.error = function (namespace, err) {
	// Log the error to the filesystem
	console.error(namespace, err);
};