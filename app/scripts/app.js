'use strict';

angular.module('chhResourcesApp'
    , ['ui.select2', 'ngCookies', 'ngResource', 'angularMoment'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/resources/:resourceId', {
        templateUrl: '/views/resources/show.html',
        controller: 'ResourcesCtrl'
      })
      .when('/admin', {
        templateUrl: '/views/main.html',
        controller: 'ResourcesCtrl'
      })
      .when('/users/:userName', {
        templateUrl: '/views/users/show.html',
        controller: 'UsersCtrl'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

  }])

  .run(function($rootScope, Auth) {

    $rootScope.search = {};

    $rootScope.modalContent = '';
    $rootScope.modal = {

      signIn: function () {
        $rootScope.modalContent = 'signIn';
      },

      signUp: function () {
        $rootScope.modalContent = 'signUp';
      }

    }

  });
