moment = require("moment");
module.exports = function(jC, callback){
    //prepare varaibles to send to the database
    var param = [];
    var tmp = {};
    tmp["components"] = '';
    //add all products in tmp format: "id1|id2|id3"
    
    for(job in jC.jobs){
        tmp["components"] += jC.jobs[job].id + '|';
        param.push([jC.jobs[job].id, jC.jobs[job].Quantity, jC.jobs[job].Part]);
    }
    //remove the last pipe
    tmp.components = tmp.components.slice(0,-1);

    //put the type
    tmp["finished"] = jC.type.name;

    tmp["orders"] = '';

    //add order same as product
    for(order in jC.order)
        tmp.orders += jC.order[order].id + '|';
    tmp.orders = tmp.orders.slice(0,-1);

    //put the department id according to the id in the database
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

    //put the bin number
    tmp.bin = jC.bin.bin;

    //add the dispatched date
    tmp.due_date = moment(jC.dueDate.date,'DD-MM-YYYY').format('YYYY-MM-DD');

    //via moment put the today date for the start date
    tmp.pulled_date = moment().format('YYYY-MM-DD HH:mm:ss');

    //add the in colour
    tmp.colour_in = jC.colourIn;
    
    //add the out colour
    tmp.colour_out = jC.colourOut;

    //add the comment
    tmp.note = jC.comment;
    console.log(tmp);
    var con = require('../connexion/db_connexion')();
    con.connect(function(err){
            if(err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
    });
    con.beginTransaction(function(err){
        if(err) 
        console.error("Error while starting transaction ");
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
                sql = 'INSERT INTO assoc_dept SET ?';
                con.query(sql,[{"id_job":insertId,"id_dept":tmp.id_dept}], function(err){
                    if (err) { 
                        con.rollback(function(err) {
                            console.error("Error while inserted in assoc_dept ");
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
                        
                        //reformat for view
                        tmp["estimated_time"] = jC.estimated_time;
                        tmp.due_date = moment(jC.dueDate.date,'DD-MM-YYYY').format('DD-MM-YYYY');
                        tmp.pulled_date = moment().format('DD-MM-YYYY HH:mm:ss');
    
                        //return the temp object (that is the jobcard)
                        return callback(tmp);
                    });
                });
            });
        });
    });
}