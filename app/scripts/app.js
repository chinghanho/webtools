'use strict';

angular.module('chhResourcesApp'
    , ['ui.select2', 'ngCookies', 'ngResource', 'angularMoment', 'ui.router', 'infinite-scroll'])

.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

  $stateProvider
    .state('index', {
      url: '/resources',
      templateUrl: '/views/main.html',
      controller: 'MainCtrl'
    })
    .state('index.show', {
      url: '/:resourceId',
      templateUrl: '/views/resources/show.html',
      controller: 'ResourcesCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/views/admin/index.html',
      controller: 'MainCtrl'
    })
    .state('users', {
      url: '/users',
      templateUrl: '/views/users/index.html'
    })
    .state('users.show', {
      url: '/:userId',
      templateUrl: '/views/users/show.html',
      controller: 'UsersCtrl'
    });

  $urlRouterProvider.otherwise('/resources');

  $locationProvider.html5Mode(true);

})

.run(function ($rootScope, Auth, Types) {

  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.modal.close();
  });

  $rootScope.auth = Auth;

  $rootScope.search = {};

  $rootScope.types = Types;

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

    editResource: function (resource) {
      $rootScope.modalContent = 'editResource';
      $rootScope.modalResource = resource;
    },

    close: function () {
      $rootScope.modalContent = '';
    }

  }

});
