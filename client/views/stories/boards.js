/*jshint -W089 */
/*jshint -W083 */
(function(){

'use strict';

angular.module('plotaway')
.controller('CustomBoardsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'board',
  function($scope, $timeout, $rootScope, $modalInstance, board){
    $scope.board = board;

    $scope.form = {
      title: board.title
    };

    $scope.dismiss = function(){
      $modalInstance.dismiss();
    };

    $scope.remove = function(){
      $scope.boards.splice($scope.boards.indexOf(board), 1);
      $modalInstance.close();
    };

    $scope.submit = function(){
      angular.extend(board, $scope.form);
      $modalInstance.close(board);
    };
  }
]);
})();

