module.exports = function(desc,callback){
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "INSERT INTO component set ?"
        con.query(sql,{"Description":desc}, function(err,results){
            if(err) throw err;
            return callback(results.insertId);
        })
    });
}