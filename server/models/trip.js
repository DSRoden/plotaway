'use strict';

 var Mongo  = require('mongodb');

function Trip(o){
  this.title = o.title;
  this.userId = o.userId;
  this.isSet = (o.isSet) ? true : false;
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Trip.findById = function(o, cb){
  var _id = Mongo.ObjectID(o.tripId);
  Trip.collection.findOne({_id:_id}, cb);
};

Trip.create = function(user, o, cb){
  o.userId = user._id;
  var trip = new Trip(o);
  Trip.collection.save(trip, function(err, trip){
    var p = {title: 'First Page', isSet: true, tripId: trip._id};
    require('./page').create(user, p, function(err, page){
      cb(err, trip);
    });
  });
};

Trip.all = function(user, cb){
  Trip.collection.find({userId:user._id}).toArray(cb);
};

Trip.set = function(user, o, cb){
  var _id = Mongo.ObjectID(o.tripId);
  Trip.collection.update({userId: user._id}, {$set: {isSet: false}}, {multi: true}, function(err, trips){
    Trip.collection.update({_id:_id}, {$set: {isSet: true}}, function(err, trip){
      console.log('this is a trip being reset>>>>>>', trip);
     cb(null, trip);
    });
  });
};

Trip.lastTrip = function(user, cb){
  console.log('inside last trip>>>>>>>>>>>', user);
  Trip.collection.findOne({userId: user._id, isSet: true}, function(err, trip){
    require('./page').collection.find({tripId: trip._id}).toArray(function(err, pages){
      console.log('getting last trip>>>>>>>>>>>>>', trip);
      cb(err, trip, pages);
    });
  });
};

module.exports = Trip;

