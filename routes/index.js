var express = require('express');
const root_folder  = './';

module.exports = function(app){
    app.get('/', (req,res)=>{
        res.sendFile('index.html', { root: root_folder });
    });

    app.get('/jobcard', (req,res)=>{
        res.sendFile('jobcard.html', { root: root_folder });
    });

    app.get('/polish', (req,res)=>{
        res.sendFile('polish.html', { root: root_folder });
    });
    
    app.use(express.static('node_modules', { root: root_folder }));

    app.use(express.static('public',{root: root_folder}));
    
    app.use((req, res, next)=>{
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page not found !!!');
    });
}