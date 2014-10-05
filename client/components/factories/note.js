(function(){
  'use strict';

  angular.module('plotaway')
  .factory('Note', ['$http', function($http){

    function create(note, trip){
      console.log(note);
      return $http.post('/notes', note);
    }

    function all(){
      return $http.get('/notes');
    }

    function remove(note){
      console.log(note);
      return $http.delete('/removenote/' + note._id);
    }

    return {create:create, all:all, remove:remove};
  }]);
})();

