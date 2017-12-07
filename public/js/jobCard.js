var option = [{name:"test"},{name:"asefsst2"},{name:"zest3"}];


Vue.component('jobcard', {
    template: '#jobcard-template',
    props:{
        data: Array,
        columns: Array,
        options: Array
    }
})

var jobcard = new Vue({
    el:'#jbCard',
    data:{
        gridColumns: ['Quantity','Part'],
        gridData:[
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
        ],
        options:option
    }
})

$(document).ready(function() {
    //render all select
    $('select').material_select();
    //on change event 
    $('select').change(function(){ 
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
});