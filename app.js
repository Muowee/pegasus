var config = require('./config')();

//load express module
var express = require('express');

//init express application
var app = express();
var server = require('http').createServer(app);

//init socket module
var io = require('socket.io').listen(server);

var routes = require('./routes')(app);

var sock = require('./controllers/socket')(io);


server.listen(config.port);