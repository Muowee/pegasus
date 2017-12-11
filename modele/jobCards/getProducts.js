

module.exports = function(callback){
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "SELECT * FROM pegasus.component"
        con.query(sql, function(err,result){
            if(err) throw err;
            return callback(result);
        })
    });

}