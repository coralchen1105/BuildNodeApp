var express = require('express');
var aboutRouter = express.Router();

var router = function(nav) {
    aboutRouter.route('/')
    .get(function(req,res){
        res.render('about',{
            title: 'Hello about',
            nav: nav
        });
    });

    return aboutRouter
}

module.exports = router;