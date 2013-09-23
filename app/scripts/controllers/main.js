'use strict'

angular.module('chhResourcesApp')

.controller('MainCtrl'
    , function ($rootScope, $scope, $location, Resources, Types) {

  $scope.resources = Resources;

  $scope.typeModel = {};

  $scope.submitNewType = function() {

    var type = new Types.Service();

    type.name = $scope.typeModel.name;
    type.$save(function (type) {
      Types.data.push(type);
      $scope.typeModel = {};
    });

  };

});
