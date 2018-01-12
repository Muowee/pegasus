module.exports = function(namespaces){
    
    namespaces.prod.on('connection', (socket)=>{
        console.log("A client is connected");
        socket.emit('message', 'You are connected to polish department!!');
            
        socket.broadcast.emit('message', 'Another client has just connected!');
        socket.on('message', (data) => {
            console.log(data); 
            socket.broadcast.emit('message',data);
        });

        socket.on('getProduct',()=>{
            require('../../modele/product/getProduct')((products)=>{
                socket.emit('products',products);
            });
        });

        socket.on('remove', (data) => {
            for(let i in data)
                require('../../modele/product/remove')(data[i].id);
        });

        socket.on('replace', (data) => {
            for(let i in data)
                require('../../modele/product/replace')(data[i]); 
            
        });

        socket.on('finish', (data) => {
            for(let i in data)
                require('../../modele/dept/endJob')(data[i].id, 1);
        });

    });

}