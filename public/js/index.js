var socket = io('/dashboard');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

var job = [];

socket.on('jobs',(data)=>{
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        tmp["priority"]=4;
        job.push(tmp);
    }
});

socket.on('newJob',(data)=>{
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        tmp["priority"]=4;
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
    
   

    // Highcharts.chart('maps', {
    //     title: {
    //         text: 'Different departments per week'
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Amount in Euros'
    //         }
    //     },
    //     legend: {
    //         layout: 'vertical',
    //         align: 'right',
    //         verticalAlign: 'middle'
    //     },
    //     plotOptions: {
    //         series: {
    //             label: {
    //                 connectorAllowed: false
    //             },
    //             pointStart: 1
    //         }
    //     },
    //     series: [{
    //         name: 'Polish',
    //         data: [null, null, null, null, null, null,null, null,1910,26841,58545]
    //     },  {
    //         name: 'Painting',
    //         data: [15623,42439,140670,54706,90412,70188,33060,50261,53359,28259,61921]
    //     }, {
    //         name: 'Antique',
    //         data: [17922,33144,84705,57288,30358,37933,42965,33946,24166,10667,75314]
    //     }, {
    //         name: 'Total',
    //         data: [225030,347230,442778,342338,336534,405030,339721,382835,410271,386115,529014]
    //     }],
    //     responsive: {
    //         rules: [{
    //             condition: {
    //                 maxWidth: 500
    //             },
    //             chartOptions: {
    //                 legend: {
    //                     layout: 'horizontal',
    //                     align: 'center',
    //                     verticalAlign: 'bottom'
    //                 }
    //             }
    //         }]
    //     }
    // });
});

