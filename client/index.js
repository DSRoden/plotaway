(function(){
  'use strict';

  angular.module('plotaway', ['gridster','ngRoute', 'LocalForageModule', 'ui.bootstrap', 'ngAnimate', 'flow', 'angularFileUpload'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/dashboard',   {templateUrl:'/views/dashboard/view.html',     controller:'DashboardCtrl'})
    .when('/stories',   {templateUrl:'/views/stories/stories.html',     controller:'StoriesCtrl'})
    .when('/boards/:boardId',   {templateUrl:'/views/stories/stories.html',     controller:'StoriesCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'plotaway', storeName:'cache', version:1.0});
  }]);
})();

