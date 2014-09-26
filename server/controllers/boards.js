'use strict';

var Board = require('../models/board');

exports.create = function(req, res){
  Board.create(req.user, req.body, function(err,board){
    console.log(board);
    res.status(200).end();
  });
};

exports.all = function(req, res){
  Board.all(req.user, function(err, boards){
    console.log('boards>>>>>>>>', boards);
    res.send({boards:boards});
  });
};

exports.findBoard = function(req, res){
  Board.findByIdWithPages(req.body, function(err, board, pages){
    console.log('board>>>>>', board);
    console.log('pages>>>>>', pages);
    res.send({board:board, pages:pages});
  });
};
