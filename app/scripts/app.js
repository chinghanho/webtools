'use strict';

angular.module('chhResourcesApp', ['ui.keypress', 'ui.select2', 'ngCookies', 'ngResource'])

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

  }]);

  // .run(['$rootScope', 'Auth', function($rootScope, Auth) {

  //   Auth.currentUser.$get({}, function(data) {
  //     if (data && !(data.message == 'Not Found')) {
  //       $rootScope.isLogged = true;
  //       if (data.role == 'admin') {
  //         $rootScope.isAdmin = true;
  //       }
  //       else {
  //         $rootScope.isAdmin = false;
  //       }
  //     }
  //     else {
  //       $rootScope.isLogged = false;
  //     }
  //   })

  // }]);
