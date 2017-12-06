//Main socket's controller

module.exports = function(io){
    
    var dash = io.of('/dashboard');
    var dept = io.of('/department');

    var dashboard = require('./dashboard')(dash);
    var department = require('./department')(dept);

}