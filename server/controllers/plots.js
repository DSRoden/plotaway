'use strict';

var Plot = require('../models/plot');

exports.save = function(req, res){
  Plot.save(req.user, req.body, function(err, plots){
    res.send({plots:plots});
  });
};

