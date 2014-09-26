'use strict';

 var Mongo  = require('mongodb');

function Page(o){
  this.title = o.title;
  this.boardId = o.boardId;
  this.userId = o.userId;
}

Object.defineProperty(Page, 'collection', {
  get: function(){return global.mongodb.collection('pages');}
});

Page.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Page.collection.findOne({_id:_id}, cb);
};

Page.create = function(user, o, cb){
  o.userId = user._id;
  var page = new Page(o);
  Page.collection.save(page, cb);
};

Page.all = function(o, cb){
  console.log(o);
  Page.collection.find({boardId:o._id}).toArray(cb);
};

module.exports = Page;

