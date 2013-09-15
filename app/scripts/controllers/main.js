'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, typesList, Auth) {

    Resources.getResources(function(resources) {
      $rootScope.resources = resources;
    });

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;
    $rootScope.search = {};

  });
