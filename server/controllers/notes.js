'use strict';

var Note = require('../models/note');

exports.create = function(req, res){
  console.log(req.body);
  Note.create(req.user, req.body, function(err, note){
    res.send({note:note});
  });
};

//exports.all = function(req, res){
  //Plot.all(req.user, function(err, plots){
    //console.log(plots);
    //res.send({plots:plots});
  //});
//};

//exports.allPlots = function(req, res){
  //Plot.allPerTrip(req.user, function(err, plots){
    //console.log('all pltos of current trip>>>>>', plots);
    //res.send({plots:plots});
  //});
//};

//exports.remove = function(req, res){
  //Plot.remove(req.params.id, function(err, plot){
    //res.send({err:err});
  //});
//};
