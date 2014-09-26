/*jshint -W089 */
/*jshint -W083 */
'use strict';

angular.module('plotaway')
.controller('StoriesCtrl', ['$scope', '$timeout', '$upload', function($scope, $timeout, $upload){
      $scope.boards= [{title: 'bob', age: '2'}, {title: 'sally', age: '3'}, {title: 'harry', age:'4'}];
      $scope.board= $scope.boards[0];

     // images?

     $scope.onFileSelect = function($files){
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++){
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt){
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config){
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };

     // flip widget on click

    $scope.flipWidget = function(widget){
      if(!widget.flipped){
          widget.flipped = true;
        } else {
          widget.flipped = false;
        }
    };

    // save plots from dashboard


    $scope.gridsterOptions = {
      margins: [2, 2],
      columns: 12,
      mobileBreakPoint: 600,
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
          row: 5,
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
        sizeX: 1,
        sizeY: 1,
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
        templateUrl: '/views/stories/plot_settings.html',
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
    }, {
      id: '5',
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
