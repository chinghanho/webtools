'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, Auth) {

    $scope.resources = Resources;

    $rootScope.auth = Auth;

  });
