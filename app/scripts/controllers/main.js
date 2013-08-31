'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, resourcesData, typesList, Auth) {

    resourcesData.resources().then(function(resources) {
      $scope.resources = resources;
    });

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;

  });
