module.exports = function(callback){
    let tmp = [];
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "CALL getAllJobCard()";
        con.query(sql, function(err, result){
            if(err) throw err;
            
            let results = result[0];

            for(let job in results){
                console.log(results[job].colour_in, results[job].colour_out);
                let tmpJob = {
                    id: results[job].id,
                    // estimated_time: results[job].estimated_time,
                    pulled_date: results[job].start_date,
                    orders: results[job].orders,
                    bin: results[job].bin,
                    department: results[job].department,
                    qty: results[job].qty,
                    products: results[job].products,
                    finished: results[job].finished,
                    due_date: results[job].due_date,
                    colour_in: results[job].colour_in,
                    colour_out: results[job].colour_out,
                    note: results[job].note
                };

                tmp.push(tmpJob);
                console.log(tmpJob);
            }
            
            return callback(tmp);
        })
    });
}