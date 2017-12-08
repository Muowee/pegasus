var option = [
    {name:"test"},
    {name:"asefsst2"},
    {name:"zest3"}
];
var departments = [
    {name:"Powder Coating"},
    {name:"Antiquing"},
    {name:"Polishing"}
];

var job = [
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''},
    { Quantity: 0, Part: ''}
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
        options: Array,
        bin: {},
        orders: Array,
        date:{},
        departments: Array,
        department:{}
    }
});

var jobcard = new Vue({
    el:'#jbCard',
    data:{
        gridColumns: ['Quantity','Part'],
        gridData: job,
        options: option,
        binNumber: {bin:''},
        orders: orders,
        dueDate: {date:''},
        departments: departments,
        department: {name:''}
    }
});

$(document).ready(function() {
    //render all select
    $('select').material_select();
    //on change event 
    $('.part select').change(function(){ 
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
            }
        });
    });

    $('.dept select').change(function(){ 
        $("#input_select3").val($(this).val());
        //manually trigger event because materialize css is not good
        $("#input_select3")[0].dispatchEvent(new Event('input', { 'bubbles': true }));

    });

    $("#datepicker").datepicker({
        onSelect: function(dateText, inst) { 
           var dateAsString = dateText; //the first parameter of this function
           $('#input_select2').val(dateText);
           $('#input_select2')[0].dispatchEvent(new Event('input', { 'bubbles': true }));

        }
    });

    $("#print").click(()=>{
        $('.edit').hide();
        $('.toHide').hide();
        $('.select-wrapper').hide();
        $('.noEdit').show();

        //clean empty value
        var jobClean = job.filter((el) => {
            return (el.Quantity !== 0 && el.Part !== '' && !isNaN(el.Quantity) ) ;
        });
        
        jobcard.gridData = jobClean;

        var orderClean = orders.filter((el) => {
            return el.id !== '' ;
        });
        
        jobcard.orders = orderClean;
        setTimeout(function(){
            window.print();
            $('.edit').show();
            $('.toHide').show();
            $('.select-wrapper').show();
            $('.noEdit').hide();
        },2000);
        
        
    });
});