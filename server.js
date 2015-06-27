var fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
	errorCodes = require('./api/common/http/errorcodes'),
	Database = require('./api/common/core/database'),
	Response = require('./api/common/http/response'),
  app = express();

// load in env variables
require('dotenv').load();

// connect to mongo
new Database();

// TODO: Add cors support here before all other middleware

// request parsers
app.use(bodyParser.json());

// make sure all api routes have a token
app.use(process.env.API_PREFIX, require('./api/middleware/validaterequest'));

// bootstrap models
var modelsDir = __dirname + '/api/models';
fs.readdirSync(modelsDir).forEach(function (modelName) {
  if (modelName.indexOf('.js') !== -1) {
    require(modelsDir + '/' + modelName);
  }
});

// bootstrap controllers
var controllersDir = __dirname + '/api/controllers';
fs.readdirSync(controllersDir).forEach(function (controllerName) {
  var controller, Controller;

  if (controllerName.indexOf('.js') !== -1) {
    Controller = require(controllersDir + '/' + controllerName);
    controller = new Controller();
    app.use(controller.getRouter());
  }
});

// bootstrap status, 404
app.get('/', function (req, res) {
  res.json({ status: 'alive' });
});

app.use(function (req, res) {
  res.status(404);
  res.json(new Response(errorCodes.ROUTE_NOT_FOUND));
});

app.listen(process.env.PORT);
console.log('Api server listening on port ' + process.env.PORT);