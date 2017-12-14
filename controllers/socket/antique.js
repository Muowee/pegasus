module.exports = function(ant){
    
   ant.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to antique department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });
    });

}