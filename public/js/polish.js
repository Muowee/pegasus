var socket = io('/polish');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

socket.on('message',(data)=>{
    console.log(data);
});

$(document).ready(()=>{

    var Tablepolish = new Vue({
        el: '#Tablepolish',
        data: {
          currentPage: 1,
          elementsPerPage: 18,
          ascending: false,
          sortColumn: '',
          rows: [
            { id: 1, Qty: "5", Description: 'washers', Finished: 'Antique Silver' ,Bin:'2737',DueDate: '21/12/2017'},
            { id: 2, Qty: "8", Description: 'canopys', Finished: 'Antique Brass',Bin:'2737',DueDate: '21/12/2017' },
            { id: 3, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017'},
            { id: 4, Qty: "9", Description: 'canopys', Finished: 'Antique Brass',Bin:'2737',DueDate: '21/12/2017' },
            { id: 5, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 6, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 5, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 7, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 8, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 9, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 10, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 11, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 12, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 13, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 14, Qty: "3", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 15, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 16, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 17, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 18, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 19, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 20, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
            { id: 21, Qty: "8", Description: 'canopys', Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' },
          ]
        },
        methods: {
          "sortTable": function sortTable(col) {
            if (this.sortColumn === col) {
              this.ascending = !this.ascending;
            } else {
              this.ascending = true;
              this.sortColumn = col;
            }
      
            var ascending = this.ascending;
      
            this.rows.sort(function(a, b) {
              if (a[col] > b[col]) {
                return ascending ? 1 : -1
              } else if (a[col] < b[col]) {
                return ascending ? -1 : 1
              }
              return 0;
            })
          },
          "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
          },
          "get_rows": function get_rows() {
            var start = (this.currentPage-1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
          },
          "change_page": function change_page(page) {
            this.currentPage = page;
          }
        },
        computed: {
          "columns": function columns() {
            if (this.rows.length == 0) {
              return [];
            }
            return Object.keys(this.rows[0])
          }
        }
      });

    // var source = $("#tablepolish");
    // var source = document.getElementById('tablepolish');
    // var destination = document.getElementById('tableantique');
    // var copy = source.cloneNode(true);
    // copy.setAttribute('id', 'tableantique');
    // destination.parentNode.replaceChild(copy, destination);

    // var source = document.getElementById('tablepolish');
    // var destination = document.getElementById('tablepainting');
    // var copy = source.cloneNode(true);
    // copy.setAttribute('id', 'tablepainting');
    // destination.parentNode.replaceChild(copy, destination);


// var mysql = require('../connexion/db_connexion');
    
//     var con = mysql.createConnection({
//       host: "localhost:8080",
//     //   user: "youruserQty",
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