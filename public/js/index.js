var socket = io('/dashboard');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
   socket.emit('getJobs');
});

var job = [];

socket.on('jobs',(data)=>{
    console.log(data);
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        job.push(tmp);
    }
});

socket.on('newJob',(data)=>{
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        job.push(tmp);
    }
})

$(document).ready(()=>{
    socket.on('message', (data) => {
        console.log(data);
    });
    $('.card').click(function(){
        socket.emit('login', $(this).find('.card-title').text());
    });

    var Tablejobcard = new Vue({
        el: '#Tablejobcard',
        data: {
            currentPage: 1,
            elementsPerPage: 20000000,
            ascending: false,
            sortColumn: '',
            rows: job
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
});

