'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, typesList, Auth) {

    $scope.resources = Resources.query({}, function (resources) {
      $scope.resources = resources;
    });

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;

  });
