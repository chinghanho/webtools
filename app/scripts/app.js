'use strict';

angular.module('chhResourcesApp'
    , ['ui.keypress', 'ui.select2', 'ngCookies', 'ngResource'])

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

  .run(['$rootScope', '$location', 'Auth'
      , function($rootScope, $location, Auth) {

    // AngularJS safe $apply (prevent "Error: $apply already in progress")
    // src: https://gist.github.com/siongui/4969449, https://coderwall.com/p/ngisma
    $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest')
        this.$eval(fn);
      else
        this.$apply(fn);
    };

    Auth.check();

    $rootScope.$on('authEvent', function() {
      $rootScope.safeApply(function() {
        $rootScope.user = Auth.user;
      });
    });

  }]);
