'use strict';

angular.module('chhResourcesApp'
    , ['ui.select2', 'ngCookies', 'ngResource', 'angularMoment'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'ResourcesCtrl'
      })
      .when('/resources/:resourceId', {
        templateUrl: '/views/main.html',
        controller: 'ResourcesCtrl'
      })
      .when('/admin', {
        templateUrl: '/views/main.html',
        controller: 'ResourcesCtrl'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

  }])

  .run(function(Auth) {});
