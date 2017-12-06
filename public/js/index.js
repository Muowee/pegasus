var socket = io.connect('http://127.0.0.1:8080');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});


$(document).ready(()=>{
    socket.on('message', (data) => {
        console.log(data);
    });
    $('.card').click(function(){
        socket.emit('login', $(this).find('.card-title').text());
    });

});