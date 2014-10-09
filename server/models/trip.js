'use strict';

 var Mongo  = require('mongodb');

function Trip(o){
  this.title = o.title;
  this.userId = o.userId;
  this.isSet = (o.isSet) ? true : false;
  this.description = o.description;
  this.start =  (o.dates.start) ? new Date(o.dates.start) : 'No Start Date';
  this.end = (o.dates.end) ? new Date(o.dates.end) : 'No End Date';
  this.budget = parseInt(o.budget);
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
    //var p = {title: 'First Page', isSet: true, tripId: trip._id};
    //require('./page').create(user, p, function(err, page){
      cb(err, trip);
    //});
  });
};

Trip.all = function(user, cb){
  Trip.collection.find({userId:user._id}).toArray(cb);
};

Trip.set = function(user, o, cb){
  var _id = Mongo.ObjectID(o.tripId);
  Trip.collection.update({userId: user._id}, {$set: {isSet: false}}, {multi: true}, function(err, trips){
    Trip.collection.update({_id:_id}, {$set: {isSet: true}}, function(err, trip){
      require('./page').collection.update({userId: user._id}, {$set: {isSet: false}}, {multi:true}, function(err, pages){
        Trip.collection.findOne({isSet: true}, function(err, setTrip){
        console.log(trip);
        cb(null, setTrip);
        });
      });
    });
  });
};

Trip.lastTrip = function(user, cb){
  console.log('inside last trip>>>>>>>>>>>', user);
  Trip.collection.findOne({userId: user._id, isSet: true}, function(err, trip){
    if(trip){
    require('./page').collection.find({tripId: trip._id}).toArray(function(err, pages){
      console.log('getting last trip>>>>>>>>>>>>>', trip);
      require('./plot').collection.find({tripId: trip._id}).toArray(function(err, plots){
        console.log('trip Id for getting notes>>>>>>>', trip._id);
        require('./note').collection.find({tripId: trip._id}).toArray(function(err, notes){
          console.log('notes>>>>>>>>>>>', notes);
          cb(err, trip, pages, plots, notes);
        });
      });
    });
   } else {
    cb();
   }
  });
};

module.exports = Trip;

