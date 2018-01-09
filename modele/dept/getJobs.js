module.exports = function(dept, callback){
    let tmp = [];
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "call getJobWithTime(?)";
        con.query(sql, [dept], function(err, result){
            if(err) throw err;
            
            let results = result[0];

            for(let job in results){
                let tmpJob = {
                    id: results[job].id,
                    estimated_time: results[job].estimated_time,
                    pulled_date: results[job].start_date,
                    orders: results[job].orders,
                    bin: results[job].bin,
                    finished: results[job].finished,
                    due_date: results[job].due_date,
                    colour_in: results[job].colour_in,
                    colour_out: results[job].colour_out,
                    note: results[job].note
                };

                tmp.push(tmpJob);

                // let id = result[job].id;
                // let estimated_time = '';
                // let pulleddate = result[job].start_date;
                // let orders = result[job].orders;
                // let bin = result[job].bin;
                // let finished = result[job].type;
                // let due_date = result[job].due_date;


            }
            
            return callback(tmp);
        })
    });
}