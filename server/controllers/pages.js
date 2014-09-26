'use strict';

var Page = require('../models/page');

exports.create = function(req, res){
  Page.create(req.user, req.body, function(err,page){
    console.log(page);
    res.status(200).end();
  });
};

exports.all = function(req, res){
  Page.all(req.body, function(err, pages){
    console.log('pages>>>>>>>>', pages);
    res.send({pages:pages});
  });
};
