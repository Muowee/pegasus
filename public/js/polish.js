var socket = io('/polish');
socket.on('connect', function(data) {
    socket.emit('getJobs');
});

socket.on('message',(data)=>{
    console.log(data);
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
    console.log(data);
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        tmp["priority"]=4;
        // //////////!!!!!!!!!!!!!!\\\\\\\\\\\ NEVER PUSH TO THE TABLE USE Vue.set(object, key, objecttoadd) insead
        Vue.set(Tablepolish.rows, Tablepolish.rows.length, tmp);
    }
});

var Tablepolish = new Vue({
    el: '#Tablepolish',
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

$(document).ready(()=>{
    //render all select
    $('.modal').modal({});
    $(".mybtn").on("click",function(){
        $(this).attr("data-value");
    });
      // Alert
    
    Materialize.toast('Welcome to the Polish Department!', 2000)


      // Uncheked bottom
    $("#clear").click(function(){
        $(".checkbox:checked").each(function(){
            $(this).prop("checked",false);
        });
    });
      // Send to antique, reference in the table
    $("#move_antique").click(function(){
        var jobs = [];
        $(".checkbox:checked").each(function(){
            var thus = this;
            let tmp = Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0];
            delete tmp.priority;
            jobs.push(tmp);
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
      let jobs = [];
      $(".checkbox:checked").each(function(){
        var thus = this;
        let tmp = Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0];
        delete tmp.priority;
        jobs.push(tmp);
        $(this).prop("checked",false);
      });
      if(confirm("Are you sure?")){
        for(let job in jobs)
          Tablepolish.rows = Tablepolish.rows.filter(rows => rows.id != jobs[job].id);
        socket.emit('sendto'+ $(this).attr('id').split('_')[1],jobs);
        console.log($(this).attr('id').split('_')[1]);
      }
    });
    // Finish process
    $("#finish").click(function(){
      var jobs = []
        $(".checkbox:checked").each(function(){
            var thus = this;
            let tmp = Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0];
            delete tmp.priority;
            jobs.push(tmp);
            $(this).prop("checked",false);
        });
        if(confirm("Do you want to finish the process?")){
            for(job in jobs)
                Tablepolish.rows = Tablepolish.rows.filter(rows => rows.id != jobs[job].id);
            socket.emit($(this).attr('id'),jobs);
        }
    });
});

