var fs = require('fs'),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express(),
  server = require('http').Server(app),
  port = process.env.PORT || 3000;

// TODO: Use https://github.com/motdotla/dotenv for config files, all configs are hard coded until we add that in

// TODO: Will eventually abstract this db logic into its own layer
// TODO: Update the options used to connect to mongo these are just basic for now
var connect = function () {
  mongoose.connect('mongodb://localhost/test', {
    server: {
      socketOptions: { keepAlive: 1 }
    }
  });
};

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// TODO: Add cors support here before all other middleware

// request parsers
// TODO: These should be on a route to route basis instead of parsing the body of all requests, here for ease of dev
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  res.json({ code: 404, message: 'Route not found' });
});

server.listen(port);
console.log('Api server listening on port ' + port);