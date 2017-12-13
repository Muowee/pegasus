moment = require("moment");
module.exports = function(jC, callback){
    var param = [];
    var tmp = {};
    tmp["components"] = '';

    for(job in jC.jobs){
        tmp["components"] += jC.jobs[job].id + '|';
        param.push([jC.jobs[job].id,jC.jobs[job].Quantity]);
    }
        tmp.components = tmp.components.slice(0,-1);

    tmp["type"] = jC.type.name;

    tmp["orders"] = '';

    for(order in jC.order)
        tmp.orders += jC.order[order].id + '|';
    tmp.orders = tmp.orders.slice(0,-1);

    switch (jC.department.name){
        case 'Antiquing':
            tmp.id_dept = 2;
            break;
        case 'Powder Coating':
            tmp.id_dept = 3;
            break;
        case 'Polishing':
            tmp.id_dept = 1;
            break;
    }

    tmp.bin = jC.bin.bin;

    tmp.dispatched_date = moment(jC.dueDate.date,'DD-MM-YYYY').format('YYYY-MM-DD');

    tmp.start_date = moment().format('YYYY-MM-DD');


    var con = require('../connexion/db_connexion')();
    con.connect(function(err){
            if(err) {
                console.erro('error connecting: ' + err.stack);
                return;
            }
    });
    con.beginTransaction(function(err){
        if(err) 
            throw err;
        let sql = 'INSERT INTO job_card set ?';
        con.query(sql, tmp, function(err, results){
            if (err) { 
                con.rollback(function(err) {
                    console.error("Error while inserted job_card ");
                });
            }
            
            let insertId = results.insertId;
            tmp.id = insertId;

            for(index in param)
                param[index].push(insertId);

            sql = 'INSERT INTO assoc_component VALUES ?';
            
            con.query(sql, [param], function(err){
                if (err) { 
                    con.rollback(function(err) {
                        console.error("Error while inserted in assoc_component ");
                    });
                }
                con.commit(function(err) {
                    if (err) { 
                      con.rollback(function() {
                        console.error("Error while commit");
                      });
                    }
                    console.log('Transaction Complete.');
                    con.end();
                    return callback(tmp);
                })
            });
        });
    });
   
}