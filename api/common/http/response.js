module.exports = Response;

function Response(err, data) {
	this.error = err ? err : undefined;
	this.data = !err && data ? data : undefined;
}