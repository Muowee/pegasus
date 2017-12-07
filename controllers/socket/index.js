//Main socket's controller

module.exports = function(io){
    
    var dash = io.of('/dashboard');
    var dept = io.of('/department');
    var jbcard = io.of('/job-card');

    var dashboard = require('./dashboard')(dash);
    var department = require('./department')(dept);
    var jobCard = require('./jobCard')(jbcard);

}