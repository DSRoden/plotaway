(function(){
  'use strict';

  angular.module('plotaway')
  .controller('StoriesCtrl', ['$scope', '$timeout', '$upload', '$modal','Board','Page', '$route', '$routeParams', '$location',
     function($scope, $timeout, $upload, $modal, Board, Page, $route, $routeParams, $location){
      $scope.boards= [];
      $scope.board= {};
      $scope.currentBoard= {};
      $scope.dt = new Date();
      $scope.page = {};
      $scope.pages = [];
      $scope.newPage = false;
      $scope.addDate = false;


      //create new page that stores current board's id
      $scope.createPage = function(){
        $scope.page.date = $scope.dt;
        $scope.page.boardId = $scope.currentBoard._id;
        Page.create($scope.page).then(function(response){
          $scope.page = {};
          $scope.newPage = false;
        });
          $scope.setCurrentBoard($scope.currentBoard);
      };

      //make sure currentBoard remains
      $scope.boardRemains = function(){
        Board.maintain($routeParams.boardId).then(function(response){
          $scope.currentBoard = response.data.board;
        });
      };

      //calendar
      $scope.displayCalendar = function(){
        $scope.addDate =($scope.addDate) ? false : true;
      };

      // initialize new page with a show
      $scope.initPage = function(){
        $scope.newPage =($scope.newPage) ? false : true;
      };

      //set currentboard and get it's pages
      $scope.setCurrentBoard = function(board){
        $scope.currentBoard = board;
        Page.all($scope.currentBoard).then(function(response){
          console.log(response);
          $scope.pages = response.data.pages;
        });
      };

      // get all boards from db
      Board.all().then(function(response){
       $scope.boards = response.data.boards;
      });

      // initialize a new board with a modal
      $scope.newBoard = function(){
        $modal.open({
          templateUrl: '/views/stories/board_settings.html',
          controller: 'BoardsCtrl'
        });
      };
    }])
  .controller('BoardsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance','Board', '$route',
    function($scope, $timeout, $rootScope, $modalInstance, Board, $route){

      $scope.board = {};

      $scope.form = {
        title: $scope.board.title
      };

      $scope.dismiss = function(){
        $modalInstance.dismiss();
      };

      // create a new board then refresh page and send confirmation toast
      $scope.submit = function(){
        Board.create($scope.form).then(function(response){
          $scope.form = {};
          $modalInstance.close();
        });
          $route.reload('/stories');
          toastr.success('New Board Added! Start Plotting!');
      };
    }
  ]);
})();
