module.exports = {
	// basic http errors
	ROUTE_NOT_FOUND: new ErrorCode(404, 'Route Not Found'),

	// user errors 50000 - 50020
	INVALID_USER_ID:  new ErrorCode(50000, 'Invalid User Id'),
	USER_NOT_FOUND: new ErrorCode(50001, 'User Not Found'),
	INVALID_USER_CREATE_DATA: new ErrorCode(50002, 'Invalid user data'),
	UNABLE_TO_CREATE_USER: new ErrorCode(50003, 'Unable to create user'),
	UNABLE_TO_REMOVE_USER: new ErrorCode(50004, 'Unable to remove user'),
	UNABLE_TO_UPDATE_USER: new ErrorCode(50005, 'Unable to update user'),
	USER_ALREADY_EXISTS: new ErrorCode(50006, 'User already exists'),
	INVALID_USER_NAME_OR_EMAIL: new ErrorCode(50007, 'Invalid email'),
	INVALID_USER_PASSWORD: new ErrorCode(50008, 'Invalid user password'),

	// auth errors 50021 - 50030
	INVALID_TOKEN: new ErrorCode(50021, 'Invalid token')
};

function ErrorCode(code, message) {
	this.code = code;
	this.message = message;
}