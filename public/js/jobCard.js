var products = {};
var options = {};

var socket = io('/job-card');
socket.on('connect', function(data) {
    socket.emit('getProducts');
});

socket.on('message',(data)=>{
    console.log(data);
});

socket.on('products',(data)=>{
    products = data;
    for(index in data)
        options[data[index].Description] = null;

    $('input.autocomplete').autocomplete({
        data: options,
        // limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
});


var departments = [
    {name:"Antiquing"},
    {name:"Powder Coating"},
    {name:"Polishing"}
];

var job = [
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''},
    { Quantity: 0, Part: '', id: '', time:''}
];

var orders= [
    {id:''},
    {id:''},
    {id:''}
];

Vue.component('jobcard', {
    template: '#jobcard-template',
    props:{
        data: Array,
        columns: Array,
        bin: {},
        orders: Array,
        date:{},
        departments: Array,
        department:{},
        type:{},
        esttime:{},
        colourin:{},
        colourout:{},
        comment:{}
    }
});

var jobcard = new Vue({
    el:'#jbCard',
    data:{
        gridColumns: ['Quantity','Part'],
        gridData: job,
        binNumber: {bin:''},
        orders: orders,
        dueDate: {date:''},
        departments: departments,
        department: {name:''},
        type: {name: ''},
        estTime: {time: '00:00:00|00:00:00|00:00:00' },
        colourIn: {name:''},
        colourOut: {name:''},
        comment: {name:''}
    },
    watch: {
        'department.name': function(){
            this.calcTime();
        }
    },
    methods: {
        calcTime: function(){
            for(let entry in this.gridData){
                let tmp = this.gridData[entry].time.split('|');
                if(tmp.length == 3){
                    let aux = [];
                    for(let i=0 ; i < tmp.length ; i++){
                        let m = moment('00:00:00','HH:mm:ss');
                        let hms = tmp[i].split(':');
                        let duration = moment.duration({
                            hours:parseInt(hms[0])*this.gridData[entry].Quantity,
                            minutes:parseInt(hms[1])*this.gridData[entry].Quantity,
                            seconds:parseInt(hms[2])*this.gridData[entry].Quantity
                        });
                        m.add(duration);
                        aux.push(m.format('HH:mm:ss'));
                    }
                    this.estTime.time = "" + aux[0] + '|' + aux[1] + '|' + aux[2];
                }
            }
        }
    }

});

$(document).ready(function() {
    //render all select
    $('select').material_select();
    //on change event 
   

    $('input.autocomplete').on('change', function () {
    
        //store this element into thus
        var thus = $(this);
        //store data-value of this into val
        var val = $(this).attr('data-value');

        //iterate all hidden input available
        $('.input_select').each(function(){
            //choose the good one
            if(val == $(this).attr('data-value')){
                //assign the value
                $(this).val(thus.val());
                //manually trigger event because materialize css is not good
                $(this)[0].dispatchEvent(new Event('input', { 'bubbles': true }));
                if(jobcard.gridData[val].Part !==''){
                    jobcard.gridData[val].id = products.filter(products => products.Description == thus.val())[0].id;
                    jobcard.gridData[val].time = products.filter(products => products.Description == thus.val())[0].processTime;

                }
            }
        });
    });

    $('.dept select').change(function(){ 
        $("#input_select3").val($(this).val());
        //manually trigger event because materialize css is not good
        $("#input_select3")[0].dispatchEvent(new Event('input', { 'bubbles': true }));

    });

    $("#datepicker").pickadate({
        format: 'dd-mm-yyyy',
        closeOnSelect: true,
    });

    $("#datepicker").change(function(){
        $('#input_select2').val($(this).val());
        $('#input_select2')[0].dispatchEvent(new Event('input', { 'bubbles': true }))
    })

    $("#print").click(()=>{
        //check if at least 1 part
        if(job.filter(el => (el.Quantity !== 0 && el.Part !== '' && !isNaN(el.Quantity) )).length)
        {
            //clean empty value
            jobcard.gridData = job.filter(el => (el.Quantity !== 0 && el.Part !== '' && !isNaN(el.Quantity) ));
    
            jobcard.orders = orders.filter(el => el.id !== '');

            $('.edit').hide();
            $('.toHide').hide();
            $('.select-wrapper').hide();
            $('.noEdit').show();
            sendNewJC();
            setTimeout(function(){
                window.print();
                $('.edit').show();
                $('.toHide').show();
                $('.select-wrapper').show();
                $('.noEdit').hide();
            },2000);
        }
        else{
            Materialize.toast("You must have at least 1 part !!",5000);
        }
            

    });
});

var sendNewJC = function(){
    var jC = {
        'jobs': jobcard.gridData,
        'bin': jobcard.binNumber,
        'department': jobcard.department,
        'dueDate': jobcard.dueDate,
        'type': jobcard.type,
        'order': jobcard.orders,
        'estimationTime': jobcard.estTime.time,
        'colourIn':jobcard.colourIn.name,
        'colourOut':jobcard.colourOut.name,
        'comment':jobcard.comment.name,
    };
    socket.emit('newJob',jC);
}