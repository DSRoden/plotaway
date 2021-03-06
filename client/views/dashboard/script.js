/*jshint -W089 */
'use strict';

angular.module('plotaway')
.controller('DashboardCtrl', ['$scope', '$timeout', 'Plot', function($scope, $timeout, Plot){

     // flip widget on click

    $scope.flipWidget = function(widget){
      if(!widget.flipped){
          widget.flipped = true;
        } else {
          widget.flipped = false;
        }
    };

    // save plots from dashboard

    $scope.savePlots = function(){
      Plot.save($scope.dashboards).then(function(response){
        $scope.dashboards = response.data.dashboards;
      });
    };

    $scope.gridsterOptions = {
      margins: [2, 2],
      columns: 8,
      mobileBreakPoint: 480,
      isMobile: true,
      draggable: {
        handle: 'h3'
      }
    };

    $scope.dashboards = {
      '1': {
        id: '1',
        name: 'Home',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 1,
          sizeX: 1,
          name: 'Widget 1',
          flipped: false
        }, {
        col: 2,
        row: 1,
        sizeY: 1,
        sizeX: 1,
        name: 'Widget 2',
        flipped: false
        }]
      },
      '2': {
        id: '2',
        name: 'Other',
        widgets: [{
          col: 1,
          row: 1,
          sizeY: 1,
          sizeX: 2,
          name: 'Other Widget 1',
          flipped: false
        }, {
          col: 1,
          row: 3,
          sizeY: 1,
          sizeX: 1,
          name: 'Other Widget 2',
          flipped: false
        }]
      }
    };

    $scope.clear = function(){
      $scope.dashboard.widgets = [];
    };

    $scope.addWidget = function(){
      $scope.dashboard.widgets.push({
        name: 'New Widget',
        sizeX: 3,
        sizeY: 3,
        flipped: false
      });
    };

    $scope.$watch('selectedDashboardId', function(newVal, oldVal){
      if (newVal !== oldVal){
        $scope.dashboard = $scope.dashboards[newVal];
      } else {
        $scope.dashboard = $scope.dashboards[1];
      }
    });

  // init dashboard
  $scope.selectedDashboardId = '1';

  }
])

.controller('CustomWidgetCtrl', ['$scope', '$modal', function($scope, $modal){

    $scope.remove = function(widget){
      $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
    };

    $scope.openSettings = function(widget){
      $modal.open({
        scope: $scope,
        templateUrl: '/views/dashboard/widget_settings.html',
        controller: 'WidgetSettingsCtrl',
        resolve: {
        widget: function(){
            return widget;
          }
        }
      });
    };

  }
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
  function($scope, $timeout, $rootScope, $modalInstance, widget){
    $scope.widget = widget;

    $scope.form = {
      name: widget.name,
      sizeX: widget.sizeX,
      sizeY: widget.sizeY,
      col: widget.col,
      row: widget.row
    };

    $scope.sizeOptions = [{
      id: '1',
      name: '1'
    }, {
      id: '2',
      name: '2'
    }, {
      id: '3',
      name: '3'
    }, {
      id: '4',
      name: '4'
    }];

    $scope.dismiss = function(){
      $modalInstance.dismiss();
    };

    $scope.remove = function(){
      $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
      $modalInstance.close();
    };

    $scope.submit = function(){
      angular.extend(widget, $scope.form);
      $modalInstance.close(widget);
    };

  }
])

// helper code
.filter('object2Array', function(){
  return function(input){
    var out = [];
    for (var i in input){
      out.push(input[i]);
    }
    return out;
  };
});
