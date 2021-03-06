//Main socket's controller

module.exports = function(io){
    //define the namespaces used by your customer and your server
    var namespaces = {};
    namespaces.dash = io.of('/dashboard');
    //-------------------^ = socket's namespace /dashboard
    namespaces.jbCard = io.of('/job-card');
    namespaces.pol = io.of('/polish');
    namespaces.ant = io.of('/antique');
    namespaces.powCoat = io.of('/powder-coated');
    namespaces.stat = io.of('/statistics');
    namespaces.prod = io.of('/product');
    namespaces.fab = io.of('/fabrication');
    namespaces.chat = io.of('/chat');


    //load socket handler modules for each namepsace
    var dashboard = require('./dashboard')(namespaces);
    var jobCard = require('./jobCard')(namespaces);
    var polish = require('./polish')(namespaces);
    var antique = require('./antique')(namespaces);
    var powder = require('./powder')(namespaces);
    var statistics = require('./statistics')(namespaces);
    var product = require('./product')(namespaces);
    var fabrication = require('./fabrication')(namespaces);
    var chat = require('./chat')(namespaces);

}