var socket = io('/dashboard');
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