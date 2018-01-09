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
        console.log(tmp);
        job.push(tmp);
    }
    console.log(job);
    
});
socket.on('newJob',(data)=>{
    console.log(data);
})

// Alert
    
Materialize.toast('Welcome to the Polish Department!', 4000)