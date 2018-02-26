module.exports = function(product){
 
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "REPLACE INTO component set ?";
        con.query(sql, 
        {
            'id': product.id,
            'Name': product.Name,
            'Description': product.Description,
            'processTime': '' + product.Antiquing + '|' + product.Antiquing_Machine + '|' + product.Powder_Coating + '|' + product.PC_Machine + '|' + product.Polishing
        }, 
        function(err, results){
            if(err) throw err;
        })
    });
}