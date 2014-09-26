(function(){
  'use strict';

  angular.module('plotaway')
  .factory('Board', ['$http', function($http){

    function create(board){
      return $http.post('/newboard', board);
    }

    function all(){
      return $http.get('/boards');
    }

    function maintain(boardId){
      return $http.post('/board', {boardId:boardId});
    }
    return {create:create, all:all, maintain:maintain};
  }]);
})();

