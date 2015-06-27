var mongoose = require('mongoose');

module.exports = Database;

function Database() {
	this._options = {
		server: {
			"socketOptions": {
				"keepAlive": 1
			}
		}
	};

	this._url = process.env.MONGO_URL;

	this.connect();
	mongoose.connection.on('error', this.onError.bind(this));
	mongoose.connection.on('disconnected', this.onDisconnect.bind(this));
}

Database.prototype.connect = function () {
	mongoose.connect(this._url, this._options);
};

Database.prototype.onError = function (err) {
	console.log(err);
};

Database.prototype.onDisconnect = function () {
	this.connect();
};