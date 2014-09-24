(function(){
  'use strict';

  angular.module('plotaway')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
    $scope.title = 'home';
    Home.getMessage().then(function(response){
      $scope.mean = response.data.mean;
    });

    $scope.customItems = [
      {size: {x: 2, y: 1}, position: [0, 0]},
      {size: {x: 2, y: 2}, position: [0, 2]},
      {size: {x: 1, y: 1}, position: [0, 4]},
      {size: {x: 1, y: 1}, position: [0, 5]},
      {size: {x: 2, y: 1}, position: [1, 0]},
      {size: {x: 1, y: 1}, position: [1, 4]},
      {size: {x: 1, y: 2}, position: [1, 5]},
      {size: {x: 1, y: 1}, position: [2, 0]},
      {size: {x: 2, y: 1}, position: [2, 1]},
      {size: {x: 1, y: 1}, position: [2, 3]},
      {size: {x: 1, y: 1}, position: [2, 4]}
    ];

     $scope.gridsterOpts = {
      minRows: 2, // the minimum height of the grid, in rows
      maxRows: 100,
      columns: 6, // the width of the grid, in columns
      colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
      rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
      margins: [10, 10], // the pixel distance between each widget
      defaultSizeX: 2, // the default width of a gridster item, if not specifed
      defaultSizeY: 1, // the default height of a gridster item, if not specified
      mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
      resizable: {
         enabled: true,
         start: function(event, uiWidget, $element){}, // optional callback fired when resize is started,
         resize: function(event, uiWidget, $element){}, // optional callback fired when item is resized,
         stop: function(event, uiWidget, $element){} // optional callback fired when item is finished resizing
      },
      draggable: {
         columns: 4,
         draggable: {
           handle: 'h3'
         },
         enabled: true, // whether dragging items is supported
         handle: '.my-class', // optional selector for resize handle
         start: function(event, uiWidget, $element){}, // optional callback fired when drag is started,
         drag: function(event, uiWidget, $element){}, // optional callback fired when item is moved,
         stop: function(event, uiWidget, $element){} // optional callback fired when item is finished dragging
      }
    };

  }]);
})();

