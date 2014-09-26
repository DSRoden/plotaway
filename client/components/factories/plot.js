(function(){
  'use strict';

  angular.module('plotaway')
  .factory('Plot', ['$http', function($http){

    function save(plots){
      return $http.post('/plots');
    }

    return {save:save};
  }]);
})();

