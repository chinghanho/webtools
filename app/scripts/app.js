'use strict';

angular.module('chhResourcesApp', ['ui.keypress', 'ui.select2'])

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
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
  }]);
