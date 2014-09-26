(function(){
  'use strict';

  angular.module('plotaway')
  .factory('Page', ['$http', function($http){

    function create(page){
      return $http.post('/newpage', page);
    }

    function all(currentBoard){
      return $http.post('/pages', currentBoard);
    }

    return {create:create, all:all};
  }]);
})();

