'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, Auth) {

    $scope.resources = Resources.query({}, function (resources) {
      $scope.resources = resources;
    });

    $rootScope.auth = Auth;

  });
