'use strict';

angular.module('chhResourcesApp'
    , ['ui.select2', 'ngCookies', 'ngResource', 'angularMoment', 'ui.router'])

  .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $stateProvider
      .state('resources', {
        // abstract: true,
        url: '/resources',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .state('resources.show', {
        url: '/:resourceId',
        templateUrl: '/views/resources/show.html',
        controller: 'ResourcesCtrl'
      });

    $urlRouterProvider.otherwise('/resources');

    // $routeProvider
    //   .when('/', {
    //     templateUrl: '/views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/resources/:resourceId', {
    //     templateUrl: '/views/resources/show.html',
    //     controller: 'ResourcesCtrl'
    //   })
    //   .when('/admin', {
    //     templateUrl: '/views/admin/index.html',
    //     controller: 'ResourcesCtrl'
    //   })
    //   .when('/users/:userName', {
    //     templateUrl: '/views/users/show.html',
    //     controller: 'UsersCtrl'
    //   })
    //   .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

  })

  .run(function ($rootScope, Auth, Types) {

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.modal.close();
    });

    $rootScope.search = {};

    $rootScope.types = Types.query({});

    $rootScope.modalContent = '';
    $rootScope.modal = {

      signIn: function () {
        $rootScope.modalContent = 'signIn';
      },

      signUp: function () {
        $rootScope.modalContent = 'signUp';
      },

      newResource: function () {
        $rootScope.modalContent = 'newResource';
      },

      showResource: function (resource) {
        $rootScope.modalContent = 'showResource';
        $rootScope.modalResource = resource;
      },

      close: function () {
        $rootScope.modalContent = '';
      }

    }

  });
