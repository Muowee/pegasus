module.exports = function(namespaces){

    namespaces.jbCard.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to jobcard!!');
        
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('getProducts',()=>{
            require('../../modele/jobCards/getProducts')((products)=>{
                socket.emit('products',products);
            });
        });

        socket.on('newJob', (jC)=>{
            require('../../modele/jobCards/createJC')(jC,(jobCard)=>{
                switch(jobCard.id_dept){
                    case 1: //polish
                        namespaces.pol.emit('newJob',jobCard);
                        break;
                    case 2: //antiquing
                        namespaces.ant.emit('newJob',jobCard);
                        break;
                    case 3: //Powder coating
                        namespaces.powCoat.emit('newJob',jobCard);
                        break;
                }
                console.log(jobCard);
            });
        });
    });
}
