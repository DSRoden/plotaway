'use strict';

var Trip = require('../models/trip');

exports.create = function(req, res){
  Trip.create(req.user, req.body, function(err,trip){
    res.send({trip: trip});
  });
};

exports.index = function(req, res){
  Trip.all(req.user, function(err, trips){
    res.send({trips:trips});
  });
};

exports.set = function(req, res){
  console.log(req.body);
  Trip.set(req.user, req.body, function(err, trip){
    console.log(trip);
    res.send({trip:trip});
  });
};

exports.last = function(req, res){
  Trip.lastTrip(req.user, function(err, trip){
    console.log(trip);
    res.send({trip:trip});
  });
};

//exports.all = function(req, res){
  //Board.all(req.user, function(err, boards){
    //console.log('boards>>>>>>>>', boards);
    //res.send({boards:boards});
  //});
//};

//exports.findBoard = function(req, res){
  //Board.findByIdWithPages(req.body, function(err, board, pages){
    //console.log('board>>>>>', board);
    //console.log('pages>>>>>', pages);
    //res.send({board:board, pages:pages});
  //});
//};
