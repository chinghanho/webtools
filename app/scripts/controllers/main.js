'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, typesList, Auth) {

    $rootScope.resources = Resources.query();

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;

  });
