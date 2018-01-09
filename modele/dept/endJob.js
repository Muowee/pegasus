module.exports = function(idJC){
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "update job_card j set j.end_date=now() where j.id = ?";
        con.query(sql, [idJC], function(err, result){
            if(err) throw err;
        });
    });
}
