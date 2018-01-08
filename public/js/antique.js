var socket = io('/polish');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

socket.on('message',(data)=>{
    console.log(data);
});

var Tablepolish = new Vue({
    el: '#Tableantique',
    data: {
      currentPage: 1,
      elementsPerPage: 20000000,
      ascending: false,
      sortColumn: '',
      rows: [
        { id: 1,PulledDate:"21/12/2017", Qty: "5", Finished: 'Antique Silver' ,Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 2,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Brass',Bin:'2737',DueDate: '21/12/2017'  , priority:'' },
        { id: 3,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 4,PulledDate:"21/12/2017", Qty: "9", Finished: 'Antique Brass',Bin:'2737',DueDate: '21/12/2017'  , priority:'' },
        { id: 5,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 6,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 32,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 7,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 8,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 9,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017' , priority:'' },
        { id: 10,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 11,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 12,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 13,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 14,PulledDate:"21/12/2017", Qty: "3", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 15,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 16,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 17,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 18,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 19,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 20,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
        { id: 21,PulledDate:"21/12/2017", Qty: "8", Finished: 'Antique Silver',Bin:'2737',DueDate: '21/12/2017', priority:'' },
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

$(document).ready(()=>{
    //render all select
    $('.modal').modal({});
    $(".mybtn").on("click",function(){
        $(this).attr("data-value");
    });
    
    

    
      // Alert
    
      Materialize.toast('Welcome to the Antique Department!', 4000)


      // Uncheked bottom
      $("#clear").click(function(){
        $(".checkbox:checked").each(function(){
            $(this).prop("checked",false);
        });
      });
      // Send to antique, reference in the table
    $("#move_polish").click(function(){
        var jobs = [];
        $(".checkbox:checked").each(function(){
            var thus = this;
            jobs.push( Tablepolish.rows.filter(rows => rows.id == $(thus).attr("id"))[0] );
            $(this).prop("checked",false);
            
        });
        if(confirm("Are you sure?")){
            for(let job in jobs)
                Tablepolish.rows = Tablepolish.rows.filter(rows => rows.id != jobs[job].id);
            socket.emit('sendto' + $(this).attr('id').split('_')[1], jobs);

        }
    // $(".modal-content").append('<p>' + JSON.stringify(job) + '</p>' );       
    });

    // Send to Powder Coating, reference in the table
    $("#move_powder").click(function(){
      var jobs = [];
      $(".checkbox:checked").each(function(){
        var thus = this;
        jobs.push(Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0]);
        $(this).prop("checked",false);
      });
      if(confirm("Are you sure?")){
        for(let job in jobs)
          Tablepolish.rows = Tablepolish.rows.filter(rows => rows.id != jobs[job].id);
        socket.emit('sendto'+ $(this).attr('id').split('_')[1],jobs);
      }
    });
    // Finish process
    $("#finish").click(function(){
      var jobs = []
      $(".checkbox:checked").each(function(){
        var thus = this;
        jobs.push(Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0]);
        $(this).prop("checked",false);
      });
      if(confirm("Do you want to finish the process?")){
        for(job in jobs)
        Tablepolish.rows = Tablepolish.rows.filter(rows => rows.id != jobs[job].id);
        socket.emit($(this).attr('id'),jobs);
      }
    });
 

});