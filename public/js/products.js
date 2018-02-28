var socket = io('/product');
socket.on('connect', function(data) {
    socket.emit('getProduct');
});

socket.on('message',(data)=>{
    console.log(data);
});
var prod = [];

socket.on('products',(data)=>{
    console.log(data);
    for(let pdt in data){
        let tmp = {};
        for( let key in data[pdt]){
            tmp[key] = data[pdt][key];
        }
        prod.push(tmp);
    }
});

socket.on('newJob',(data)=>{
    // console.log(data);
    for(let pdt in data){
        let tmp = {};
        for( let key in data[pdt]){
            tmp[key] = data[pdt][key];
        }
        // //////////!!!!!!!!!!!!!!\\\\\\\\\\\ NEVER PUSH TO THE TABLE USE Vue.set(object, key, objecttoadd) insead
        Vue.set(Tableproduct.rows, Tableproduct.rows.length, tmp);
    }
});

var Tableproduct = new Vue({
    el: '#Tableproduct',
    data: {
      currentPage: 1,
      elementsPerPage: 20000000,
      ascending: false,
      sortColumn: '',
      rows: prod
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
    
    Materialize.toast('Welcome to the product management section!', 2000)


      // Uncheked bottom
    $("#clear").click(function(){
        $(".checkbox:checked").each(function(){
            $(this).prop("checked",false);
        });
    });
      // Send to antique, reference in the table
    $("#remove").click(function(){
        var prods = [];
        $(".checkbox:checked").each(function(){
            var thus = this;
            let tmp = Tableproduct.rows.filter(rows => rows.id ==$(thus).attr("id"))[0];
            prods.push(tmp);
            $(this).prop("checked",false);
        });

        if(confirm("You will DELETE the items. CLIP are you sure?")){
            for(let prod in prods)
                Tableproduct.rows = Tableproduct.rows.filter(rows => rows.id != prods[prod].id);
            socket.emit('remove', prods);

        }
    // $(".modal-content").append('<p>' + JSON.stringify(prod) + '</p>' );       
    });

    // Send to Powder Coating, reference in the table
    $("#change").click(function(){
        let prods = [];
        $(".checkbox:checked").each(function(){
            var thus = this;
            let tmp = Tableproduct.rows.filter(rows => rows.id == $(thus).attr("id"))[0];
            prods.push(tmp);
            $(this).prop("checked",false);
        });
        if(confirm("You will modify the item(s). Are you sure?")){
            socket.emit('replace', prods);
        }
    });
    // Add process
    $("#add").click(function(){
        Vue.set(Tableproduct.rows, Tableproduct.rows.length, 
            {
                'id': getMax(Tableproduct.rows, "id").id + 1, 
                'Name': '', 
                'Description': '', 
                'Antiquing':'00:00:00',
                'Antiquing_Machine':'00:00:00', 
                'Powder_Coating': '00:00:00',
                'PC_Machine':'00:00:00', 
                'Polishing':'00:00:00' 
            }
        );
        window.setTimeout(() => {
            $(".checkbox:last").prop('checked', true);
        }, 5);
        
    });
});


var check = function(thus){
    $("#"+$(thus).attr("data-value")).prop('checked', true);
}

var getMax = function (arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}