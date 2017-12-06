var config = require('./config')();

//load express module
var express = require('express');

//init express application
var app = express();
var server = require('http').createServer(app);

//init socket module
var io = require('socket.io').listen(server);

//init session module
var session = require('express-session')({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

//init sharedSession
var sharedSession = require('express-socket.io-session');

//init json person object to remember who is who
var person = {};

// Attach session
app.use(session);

//Share session with io socket
io.use(sharedSession(session));

var routes = require('./routes')(app);

io.sockets.on('connection', (socket)=>{
    console.log("A client is connected");
    socket.emit('message', 'You are connected!!');
    
    require('./controllers/usr_mgt')(socket, person);
    
    socket.broadcast.emit('message', 'Another client has just connected!');
    socket.on('message', (data) => {
        console.log(data); 
        socket.broadcast.emit('message',data)
    });
});



server.listen(config.port);