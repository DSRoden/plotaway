(function(){
  'use strict';

  angular.module('plotaway')
  .controller('TripsCtrl', ['$scope', 'Trip','$modal', '$location', '$interval', '$route', '$routeParams', function($scope, Trip, $modal, $location, $interval, $route, $routeParams){
    $scope.trip = {};
    $scope.trip.title = 'Trip Title';
    $scope.trips = [];
    $scope.tools = ['1', '2', '3'];
    $scope.newTrip = {};

    //initialize page with most recent trip

    Trip.getLast().then(function(response){
      $scope.currentTrip = response.data.trip;
    });

    //set currentTrip to trip that user selects from 'My Trips'
    $scope.setTrip = function(trip){
      $scope.currentTrip = trip;
      Trip.set($scope.currentTrip._id).then(function(response){
        $scope.currentTrip = response.data.trip;
        $route.reload('/trips');
      });
    };

    //get all trips from db upon intial load and subsequent loads
    Trip.all().then(function(response){
      $scope.trips = response.data.trips;
    });

    //initiate a modal form for creating a new trip
    $scope.newTrip = function(){
     var newTripModal = $modal.open({
        templateUrl: '/views/new_trips/new_trips.html',
        controller: 'NewTripsCtrl',
        resolve: {
          newTrip : function(){
            return $scope.newTrip;
          }
        }
      });

     // set the results of the modal form
     // to lastTripAdded and push it into trips array
     newTripModal.result.then(function(trip){
      $scope.lastTripAdded = trip;
      $scope.trips.push($scope.lastTripAdded);
     });
    };


  }]);
})();

