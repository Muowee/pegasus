module.exports = function(callback){
    let tmp = [];
    var con = require('../connexion/db_connexion')();
    var res = con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "SELECT c.id, c.Name, c.Description, SUBSTRING_INDEX(c.processTime , '|' , 1) as 'Antiquing', SUBSTRING_INDEX(SUBSTRING_INDEX(c.processTime , '|' , 2), '|' , -1) as 'Powder_Coating', SUBSTRING_INDEX(c.processTime , '|' , -1) as 'Polishing' FROM component c";
        con.query(sql, function(err, results){
            if(err) throw err;

            for(let product in results){
                
                let tmpProd = {
                    id: results[product].id,
                    Name: results[product].Name,
                    Description: results[product].Description,
                    Antiquing: results[product].Antiquing,
                    Powder_Coating: results[product].Powder_Coating,
                    Polishing: results[product].Polishing,
                    
                };

                tmp.push(tmpProd);
                
            }
            
            return callback(tmp);
        })
    });
}