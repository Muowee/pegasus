var socket = io('/polish');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

socket.on('message',(data)=>{
    console.log(data);
});

$(document).ready(()=>{

var source = document.getElementById('tablepolish');
var destination = document.getElementById('tableantique');
var copy = source.cloneNode(true);
    copy.setAttribute('id', 'tableantique');
    destination.parentNode.replaceChild(copy, destination);

var source = document.getElementById('tablepolish');
var destination = document.getElementById('tablepainting');
var copy = source.cloneNode(true);
    copy.setAttribute('id', 'tablepainting');
    destination.parentNode.replaceChild(copy, destination);


// var mysql = require('../connexion/db_connexion');
    
//     var con = mysql.createConnection({
//       host: "localhost:8080",
//     //   user: "yourusername",
//     //   password: "yourpassword",
//     //   database: "mydb"
//     });
    
//     con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//       var sql = "SELECT * FROM pegasus.products";
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Result");
//       });
//     });

// Pagination, basic parameters
var totalRec = 0,

pageSize  = 10,

pageCount = 0;

var start       = 0;

var currentPage = 1;

var title  = 'Pagination';


});