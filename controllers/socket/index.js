//Main socket's controller

module.exports = function(io){
    
    var dash = io.of('/dashboard');
    var dept = io.of('/department');
    var jbcard = io.of('/job-card');
    var pol = io.of('/polish');
    var ant = io.of('/antique');

    var dashboard = require('./dashboard')(dash);
    var department = require('./department')(dept);
    var jobCard = require('./jobCard')(jbcard);
    var polish = require('./polish')(pol);
    var antique = require('./antique')(ant);

}