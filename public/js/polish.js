var socket = io('/polish');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

socket.on('message',(data)=>{
    console.log(data);
});

$(document).ready(()=>{

});