module.exports = function(namespaces){
    
    namespaces.fab.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to fabrication department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('getJobs',()=>{
            require('../../modele/dept/getJobs')(4, (jobs)=>{
                socket.emit('jobs',jobs);
            });
        });

        socket.on('finish', (data) => {
            for(let i in data)
                require('../../modele/dept/endJob')(data[i].id, 4);
        });

    });

}