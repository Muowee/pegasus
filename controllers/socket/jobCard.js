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
                        delete jobCard.id_dept;
                        namespaces.pol.emit('newJob',[jobCard]);
                        break;
                    case 2: //antiquing
                        delete jobCard.id_dept;
                        namespaces.ant.emit('newJob',[jobCard]);
                        break;
                    case 3: //Powder coating
                        delete jobCard.id_dept;
                        namespaces.powCoat.emit('newJob',[jobCard]);
                        break;
                }
            });
        });
    });
}
