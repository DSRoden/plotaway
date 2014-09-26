'use strict';

 var Mongo  = require('mongodb');

function Board(o){
  this.title = o.title;
  this.userId = o.userId;
  this.pages = [];
}

Object.defineProperty(Board, 'collection', {
  get: function(){return global.mongodb.collection('boards');}
});

Board.findById = function(o, cb){
  var _id = Mongo.ObjectID(o.boardId);
  Board.collection.findOne({_id:_id}, cb);
};

Board.create = function(user, o, cb){
  o.userId = user._id;
  var board = new Board(o);
  Board.collection.save(board, cb);
};

Board.all = function(user, cb){
  Board.collection.find({userId:user._id}).toArray(cb);
};

Board.findByIdWithPages = function(o, cb){
  var _id = Mongo.ObjectID(o.boardId);
  Board.collection.findOne({_id:_id}, function(err, board){
    require('./page').collection.find({boardId:board._id}).toArray(function(err, pages){
      cb(null, board, pages);
    });
  });
};

module.exports = Board;

