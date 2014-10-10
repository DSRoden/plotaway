(function(){
  'use strict';

  angular.module('plotaway')
  .controller('PublicItinCtrl', ['$scope', '$location', 'Plot', 'Itin', 'User','$localForage', function($scope, $location, Plot, Itin, User, $localForage){
    $scope.plots = [];
    $scope.page = {};
    $scope.showBrowse = true;

    $localForage.getItem('email').then(function(email){
      $scope.email = email;
      if($scope.email !== null){
        $scope.title = 'Public Itineraries';
      }
    });


    $scope.publicItineraries = [];

    //User.user().then(function(response){
         //debugger;
      //$scope.user = response.data;
      //console.log($scope.user);
    //});

    $scope.getItins = function(){
       Itin.getPubItins().then(function(response){
         $scope.publicItineraries = response.data.itineraries;
         console.log($scope.publicItineraries);
       });
    };

    $scope.getItins();


    $scope.displayItin = function(itinerary){
      $location.path('/itinerary/' + itinerary._id);
    };

  }]);
})();

