'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, Resources, typesList, Auth) {

    $scope.resources = Resources.query({}, function (resources) {
      $scope.resources = resources;
    });

    $scope.modalContent = '';

    $scope.signIn = function () {
      $scope.modalContent = 'signIn';
    };

    $scope.signUp = function () {
      $scope.modalContent = 'signUp';
    };

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;

  });
