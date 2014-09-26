'use strict';

 var Mongo  = require('mongodb');

function Plot(){
}

Object.defineProperty(Plot, 'collection', {
  get: function(){return global.mongodb.collection('plots');}
});

Plot.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Plot.collection.findOne({_id:_id}, cb);
};


module.exports = Plot;

