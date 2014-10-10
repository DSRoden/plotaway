(function(){
  'use strict';

  angular.module('plotaway')
  .controller('ItineraryCtrl', ['$scope', '$routeParams', 'Plot', 'Itin', 'User','$localForage', function($scope, $routeParams, Plot, Itin, User, $localForage){
    $scope.plots = [];
    $scope.pages = [];
    $scope.publicItin = {};
    $scope.page = {};
    //$scope.onePublicItin = true;

    $localForage.getItem('email').then(function(email){
      $scope.email = email;
      if($scope.email !== null){
        $scope.title = 'Public Itinerary';
      }
    });

    var id = $routeParams.id;
    console.log(id);

    $scope.getPagePlots = function(){
      Itin.getPlots($scope.page._id).then(function(response){
        $scope.plots = response.data.plots;
      });
    };

    Itin.getItinPages(id).then(function(response){
      $scope.publicItin = response.data.itinerary;
      $scope.pages = response.data.pages;
      $scope.onePublicItin = true;
      $scope.page = $scope.pages[0];
      console.log($scope.page);
      $scope.getPagePlots();
      $scope.displayPublicPage = true;
    });

    $scope.seePage = function(page){
      $scope.page = page;
      $scope.getPagePlots();
    };

  }]);
})();

