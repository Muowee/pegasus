var socket = io('/polish');
socket.on('connect', function(data) {
    socket.emit('getJobs');
});

socket.on('message',(data)=>{
    console.log(data);
});
var job = [];

socket.on('jobs',(data)=>{
    console.log(data);
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        tmp["priority"]=4;
        job.push(tmp);
    }
    Tablepolish.calcTime();
});

socket.on('newJob',(data)=>{
    // console.log(data);
    for(let jb in data){
        let tmp = {};
        for( let key in data[jb]){
            tmp[key] = data[jb][key];
        }
        tmp["priority"]=4;
        // //////////!!!!!!!!!!!!!!\\\\\\\\\\\ NEVER PUSH TO THE TABLE USE Vue.set(object, key, objecttoadd) insead
        Vue.set(Tablepolish.rows, Tablepolish.rows.length, tmp);
    }
    Tablepolish.calcTime();
});



var Tablepolish = new Vue({
    el: '#Tablepolish',
    data: {
        currentPage: 1,
        elementsPerPage: 20000000,
        ascending: false,
        sortColumn: '',
        rows: job,
        estimatedTime: '00:00:00'       
    },
    methods: {
        "calcTime": function(){
            let time1 = 0;
            let time2 = 0;
            let time3 = 0;
            let time4 = 0;
            let time5 = 0;
            for(let entry in this.rows){
                let tmp = this.rows[entry].estimated_time.split('|');
                if(tmp.length == 5){
                    for(let i = 0 ; i < tmp.length ; i ++){
                        let hms = tmp[i].split(':');
                        switch(i){
                            case 0:
                                time1 += (parseInt(hms[0]*3600) + parseInt(hms[1]*60) + parseInt(hms[2]));
                                break;
                            case 1:
                                time2 += (parseInt(hms[0]*3600) + parseInt(hms[1]*60) + parseInt(hms[2]));                       
                                break;
                            case 2:
                                time3 += (parseInt(hms[0]*3600) + parseInt(hms[1]*60) + parseInt(hms[2]));                       
                                break;
                            case 3:
                                time4 += (parseInt(hms[0]*3600) + parseInt(hms[1]*60) + parseInt(hms[2]));                       
                                break;
                            case 4:
                                time5 += (parseInt(hms[0]*3600) + parseInt(hms[1]*60) + parseInt(hms[2]));                       
                                break;
                        }
                    }
                }
            }
            let aux1 = str_pad_left(Math.floor( time1 / 3600 ), '0', 2) + ':' + str_pad_left(Math.floor(( time1 % 3600 ) / 60), '0', 2) + ':' + str_pad_left(( time1 % 3600 ) % 60, '0', 2);
            let aux2 = str_pad_left(Math.floor( time2 / 3600 ), '0', 2) + ':' + str_pad_left(Math.floor(( time2 % 3600 ) / 60), '0', 2) + ':' + str_pad_left(( time2 % 3600 ) % 60, '0', 2);
            let aux3 = str_pad_left(Math.floor( time3 / 3600 ), '0', 2) + ':' + str_pad_left(Math.floor(( time3 % 3600 ) / 60), '0', 2) + ':' + str_pad_left(( time3 % 3600 ) % 60, '0', 2);
            let aux4 = str_pad_left(Math.floor( time4 / 3600 ), '0', 2) + ':' + str_pad_left(Math.floor(( time4 % 3600 ) / 60), '0', 2) + ':' + str_pad_left(( time4 % 3600 ) % 60, '0', 2);
            let aux5 = Math.floor( time5 / 3600 ) + ':' + str_pad_left(Math.floor(( time5 % 3600 ) / 60), '0', 2) + ':' + str_pad_left(( time5 % 3600 ) % 60, '0', 2);
            this.estimatedTime = aux5;
       } ,
       /* csvExport: function (users) {
        var csvContent = "data:text/csv;charset=utf-8,";
        csvContent += this.users.map(function(d){
          console.log(d);
          return JSON.stringify(d);
        })
        .join('\n') 
        .replace(/(^\{)|(\}$)/mg, '');
        window.open( encodeURI(csvContent) );
      } */
      

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
            Tablepolish.calcTime();

        }
       /*  $(".modal-content").append('<p>' + JSON.stringify(job) + '</p>' );   */
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
        Tablepolish.calcTime();
      }
    });
    //View items
    $('#modal1').modal('open');


    // $("#view").click(function()){
    //     let jobs = [];
    //     $(".checkbox:checked").each(function(){
    //         var thus = this;
    //         let tmp = Tablepolish.rows.filter(rows => rows.id ==$(thus).attr("id"))[0];
    //     $(this).prop("checked",false)

    //     }
    //     $(".modal-content").append('<p>' + JSON.stringify(job) + '</p>' );
    // }

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
            Tablepolish.calcTime();
            
        }
    });
});

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}