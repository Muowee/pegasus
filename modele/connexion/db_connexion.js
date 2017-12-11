var cfg = require('../../config/dbParam')()
var mysql = require('mysql');

module.exports = function(){
    var con = mysql.createConnection(cfg);
    return con;
}