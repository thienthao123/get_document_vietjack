var express = require('express');
var app = express.Router();

var getVietJack = require('../lib/getVietJack')

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/',(req,res) =>{
    var url = req.body.url
    if(url){
        getVietJack(url,(data) =>{
            res.render('index',{
                array : data
            })
        })
    }
})

module.exports = app;
