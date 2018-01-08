module.exports = function(namespaces){
    
    namespaces.ant.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to antique department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('sendtopolish',(data) => {
            console.log(data)
        });

        socket.on('sendtopowder',(data) => {
            console.log(data)
        });

        socket.on('finish',(data) => {
            console.log(data)
        });
    });

}