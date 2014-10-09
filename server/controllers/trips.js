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
  console.log(req.user.email);
  console.log(req.body);
  Trip.set(req.user, req.body, function(err, trip){
    console.log(trip);
    res.send({trip:trip});
  });
};

exports.last = function(req, res){
  Trip.lastTrip(req.user, function(err, trip, pages, plots, notes){
    console.log(trip);
    console.log('last/ pages>>>>>>>>>>>>', pages);
    console.log('last/ notes>>>>>>>>>>>>>>', notes);
    res.send({trip:trip, pages:pages, plots: plots, notes: notes});
  });
};
