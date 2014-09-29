(function(){
  'use strict';

  angular.module('plotaway')
  .controller('TripsCtrl', ['$scope', 'Trip', 'Page', '$modal', '$location', '$rootScope', '$interval', '$route', '$routeParams',
    function($scope, Trip, Page, $modal, $location, $rootScope, $interval, $route, $routeParams){
    $scope.trip  = {};
    $scope.trips = [];
    $scope.tools = ['1', '2', '3'];
    $scope.pages = [];
    $scope.page  = {};

    //initiate a modal form for creating a new page
    $scope.newPage = function(){
     var newPageModal = $modal.open({
        templateUrl: '/views/new_pages/new_pages.html',
        controller: 'NewPagesCtrl',
        resolve: {
          newPage : function(){
            return $scope.newPage;
          }
        }
      });

     // set the results of the modal form
     // to lastTripAdded and push it into trips array
     newPageModal.result.then(function(page){
       $scope.lastPageAdded = page;
       $scope.pages.push($scope.lastPageAdded);
     });
    };

    // set and display page to page that user selects from Pages
    $scope.setPage = function(page){
      $scope.page = page;
      Page.set($scope.page._id).then(function(response){
        $scope.page = response.data.page;
      });
    };

    //initialize page with most recent trip,
    //make sure if this is the first trip to set
    //the 'registration' trip as current trip
    //also bring back all pages associated with said trip

    if($scope.trips.length === 1){
    $scope.trip = $scope.trips[0];
    }

    Trip.getLast().then(function(response){
      $scope.trip = response.data.trip;
      $scope.pages = response.data.pages;

      for(var i = 0; i < $scope.pages.length; i++){
        if($scope.pages[i].isSet === true){
          $scope.page = $scope.pages[i];
        }
      }
        //var transmit = $scope.trip;
        //$rootScope.$broadcast('transmitTrip', transmit);
        //console.log('broadcasting', transmit);
    });

    //set and display trip to trip that user selects from 'My Trips'
    $scope.setTrip = function(trip){
      $scope.trip = trip;
      Trip.set($scope.trip._id).then(function(response){
        $scope.trip = response.data.trip;
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

