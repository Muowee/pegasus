moment = require("moment");
module.exports = function(data, deptIn){
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "UPDATE job_card j set j.id_dept=2 where j.id = ?";
        con.query(sql, [data.id], function(err, result){
            if(err) throw err;
            sql = 'INSERT INTO assoc_dept SET ?';
            con.query(sql, [{"id_job":data.id, "id_dept":2}], function(err, result){
                if(err) throw err;
                sql = 'UPDATE assoc_dept SET end=now() where id_job=? and id_dept=?';
                    con.query(sql, [data.id, deptIn], function(err, result){
                if(err) throw err;
            });
            });
        });
    });
}