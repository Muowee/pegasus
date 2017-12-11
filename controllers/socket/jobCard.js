module.exports = function(jbCard){

    jbCard.on('connection', (socket)=>{
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

    });
}
