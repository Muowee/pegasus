//import config file
var config = require('./config')();

//import express module
var express = require('express');

//init express application
var app = express();
//create a server and send the express's app to it
var server = require('http').createServer(app);

//init socket module
var io = require('socket.io').listen(server);

//import routes module
var routes = require('./routes')(app);

//import socket management module
//when the directory is called it's like you call the index.js inside this folder
var sock = require('./controllers/socket')(io);

//start the server and listen to the config port
server.listen(config.port);