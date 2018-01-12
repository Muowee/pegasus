module.exports = function(namespaces){
    
    namespaces.ant.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to antique department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('getJobs',()=>{
            require('../../modele/dept/getJobs')(2, (jobs)=>{
                socket.emit('jobs',jobs);
            });
        });

        socket.on('sendtopolish',(data) => {
            for(let i in data)
                require('../../modele/dept/sendToPolish')(data[i], 2);
                namespaces.pol.emit('newJob',data);
        });

        socket.on('sendtopowder',(data) => {
            for(let i in data)
                require('../../modele/dept/sendToPowder')(data[i], 2); 
                namespaces.powCoat.emit('newJob',data);
        });

        socket.on('finish',(data) => {
            for(let i in data)
                require('../../modele/dept/endJob')(data[i].id, 2);
        });
    });

}