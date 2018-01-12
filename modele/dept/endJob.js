moment = require("moment");
module.exports = function(idJC, idDept){
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "update job_card j set j.end_date=now() where j.id = ?";
        con.query(sql, [idJC], function(err, result){
            if(err) throw err;
            sql = 'INSERT INTO assoc_dept SET ?';
            con.query(sql, [{"id_job":idJC, "id_dept":idDept, "end":moment().format('YYYY-MM-DD')}], function(err, result){
                if(err) throw err;
            });
        });
    });
}
