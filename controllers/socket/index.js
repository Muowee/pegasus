//Main socket's controller

module.exports = function(io){
    var namespaces = {};
    namespaces.dash = io.of('/dashboard');
    namespaces.dept = io.of('/department');
    namespaces.jbCard = io.of('/job-card');
    namespaces.pol = io.of('/polish');
    namespaces.ant = io.of('/antique');
    namespaces.powCoat = io.of('/powder-coated');
    namespaces.stat = io.of('/statistics');
    namespaces.prod = io.of('/product');

    var dashboard = require('./dashboard')(namespaces);
    // var department = require('./department')(namespaces);
    var jobCard = require('./jobCard')(namespaces);
    var polish = require('./polish')(namespaces);
    var antique = require('./antique')(namespaces);
    var powder = require('./powder')(namespaces);
    var statistics = require('./statistics')(namespaces);
    var product = require('./product')(namespaces);

}