module.exports = function(id){
    let tmp = [];
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "DELETE FROM component WHERE id = ?;";
        con.query(sql, [id] , function(err, results){
            if(err) throw err;
        })
    });
}