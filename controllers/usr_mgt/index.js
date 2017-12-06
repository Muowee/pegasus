//return the sockect of the desire user
var getSocket = (id => io.sockets.connected[id]);

module.exports = function(socket, person){

    //User Login
    socket.on('login', (userData) => {
        //bind user data to the session
        person[socket.id] = userData
        socket.handshake.session.userRoom = userData;
        //save the connection
        socket.handshake.session.save();
        console.log(socket.handshake.session.userRoom)
        socket.emit('message', 'welcome!!!!' + person[socket.id]);
        
    });

    socket.on('logout', () => {
        //unbind user data to the session
        delete person[socket.id];
        delete socket.handshake.session.userRoom;
        //save the connection
        socket.handshake.session.save();
    });

    socket.on('disconnect', () =>{
        delete person[socket.id];
        delete socket.handshake.session.userRoom;
        socket.handshake.session.save();
    });
    
}

