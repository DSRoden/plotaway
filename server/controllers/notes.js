'use strict';

var Note = require('../models/note');

exports.create = function(req, res){
  console.log(req.body);
  Note.create(req.user, req.body, function(err, note){
    res.send({note:note});
  });
};

exports.all = function(req, res){
  Note.all(req.user, req.params.id, function(err, notes){
    console.log('notes from note.all >>>>>>>>>', notes);
    res.send({notes:notes});
  });
};

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
