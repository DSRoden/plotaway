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

    function set(page){
      return $http.post('/setpage', {page:page});
    }

    return {create:create, all:all, set:set};
  }]);
})();

