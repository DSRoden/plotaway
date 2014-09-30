/*jshint -W030 */
/*jshint camelcase: false*/
/*global google*/
(function(){
  'use strict';

  angular.module('plotaway')
  .controller('TripsCtrl', ['$scope', 'Trip', 'Page', '$modal', '$location', '$rootScope', '$interval', '$route', '$routeParams', '$log',
    function($scope, Trip, Page, $modal, $location, $rootScope, $interval, $route, $routeParams, $log){

    $scope.trip       = {};
    $scope.trips      = [];
    $scope.tools      = ['Wiki', 'Map', 'Budget', 'Tips'];
    $scope.pages      = [];
    $scope.page       = {};
    $scope.showMap    = false;

////////////////////////////////////////////////////////////////////////////////////////
///////MAP, SHOULD BE REFACTORED TO ANOTHER CONTROLLER, ALSO NOT FLUID ENOUGH//////////
//////////////////////////////////////////////////////////////////////////////////////

    //set scope properties for map
    $scope.gPlace;
    $scope.city = {};
    $scope.cityCap = null;
    $scope.lat = 40;
    $scope.lng = -74;

    //make a function that will create a map with a marker
    var updateMap = function(lat, lng){
      $scope.map = {
        center: {
          latitude: $scope.lat,
          longitude: $scope.lng
        },
        zoom: 12
      };

      //code place marker/pin
      $scope.marker= {
        id:0,
        coords: {
          latitude: $scope.lat,
          longitude: $scope.lng
        },
        options: {draggable: true},
        events: {
          dragend: function(marker, eventName, args){
                    $log.log('marker dragend');
                    $log.log(marker.getPosition().lat());
                    $log.log(marker.getPosition().lng());
                    $log.log(marker.setAnimation(google.maps.Animation.BOUNCE));
                  }
        }
     };
  };

    //call the function to make the map
    updateMap();

    //geocode function
    function codeAddress(){
      var address = $scope.city.name,
          geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status){
        //var name = results[0].geometry.formatted_address,
        $scope.lat= results[0].geometry.location.lat(),
        $scope.lng = results[0].geometry.location.lng();
        //console.log($scope.lat, $scope.lng);
      });
    }

    // find location info and update map
    $scope.mapLocation = function(){
       $scope.cityCap= $scope.city.name.split(',')[0];
       //var city = $scope.city.name;
       //console.log(city);
       //geocode the city
       codeAddress();
       updateMap();
       //refresh the map
       $scope.map.refresh = true;
    };

///////////////////////////////////////////////////////////////////
/////////END OF MAP CODE/////////////////////////////////////////
///////////////////////////////////////////////////////////////


    //show tools as they are selected
    $scope.fetchTool = function(tool){
      switch(tool){
        case 'Map':
          $scope.showMap = true;
      }
    };

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

