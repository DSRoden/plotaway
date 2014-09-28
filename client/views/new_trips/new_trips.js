(function(){
  'use strict';

  angular.module('plotaway')
  .controller('NewTripsCtrl', ['$scope', 'Trip', '$modalInstance', '$route','$rootScope', '$timeout','newTrip',
    function($scope, Trip, $modalInstance, $route, $rootScope, $timeout, newTrip){
      $scope.newTrip = newTrip;

      $scope.form = {
        title: $scope.newTrip.title
      };

      $scope.dismiss = function(){
        $modalInstance.dismiss();
      };

      // create a new trip then refresh page and send confirmation toast
      $scope.submit = function(){
        Trip.create($scope.form).then(function(response){
          $scope.trip = response.data.trip;
          $modalInstance.close($scope.trip);
        });
          toastr.success('New Trip Added!');
      };
    }
  ]);
})();

