module.exports = function(namespaces){
    
    namespaces.pol.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to polish department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('getJobs',()=>{
            require('../../modele/dept/getJobs')(1, (jobs)=>{
                socket.emit('jobs',jobs);
            });
        });

        socket.on('sendtoantique', (data) => {
            for(let i in data)
                require('../../modele/dept/sendToAntique')(data[i], 1);
            namespaces.ant.emit('newJob',data);
            
        });

        socket.on('sendtopowder', (data) => {
            for(let i in data)
                require('../../modele/dept/sendToPowder')(data[i], 1); 
            namespaces.powCoat.emit('newJob',data);
        });

        socket.on('finish', (data) => {
            for(let i in data)
                require('../../modele/dept/endJob')(data[i].id, 1);
        });

    });

}