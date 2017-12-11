var socket = io('/dashboard');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});


$(document).ready(()=>{
    socket.on('message', (data) => {
        console.log(data);
    });
    $('.card').click(function(){
        socket.emit('login', $(this).find('.card-title').text());
    });

    Highcharts.chart('maps', {
        title: {
            text: 'Different departments per week'
        },
        yAxis: {
            title: {
                text: 'Amount in Euros'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },
        series: [{
            name: 'Polish',
            data: [null, null, null, null, null, null,null, null,1910,26841,58545]
        },  {
            name: 'Painting',
            data: [15623,42439,140670,54706,90412,70188,33060,50261,53359,28259,61921]
        }, {
            name: 'Antique',
            data: [17922,33144,84705,57288,30358,37933,42965,33946,24166,10667,75314]
        }, {
            name: 'Total',
            data: [225030,347230,442778,342338,336534,405030,339721,382835,410271,386115,529014]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
});

