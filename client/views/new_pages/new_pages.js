(function(){
  'use strict';

  angular.module('plotaway')
  .controller('NewPagesCtrl', ['$scope', 'Page', '$modalInstance', '$route','$rootScope', '$timeout','newPage',
    function($scope, Page, $modalInstance, $route, $rootScope, $timeout, newPage){
      console.log('listening');
      $rootScope.$on('transmitTrip', function(event, transmit){
        console.log(transmit);
      });

      $scope.newPage = newPage;
      $scope.form = {
        title: $scope.newPage.title
      };

      $scope.dismiss = function(){
        $modalInstance.dismiss();
      };

      // create a new trip then refresh page and send confirmation toast
      $scope.submit = function(){
        Page.create($scope.form).then(function(response){
          console.log(response);
          $scope.page = response.data.page;
          $modalInstance.close($scope.page);
          toastr.success('Added a page!');
        });
      };
    }
  ]);
})();

