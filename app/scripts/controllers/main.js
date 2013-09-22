'use strict'

angular.module('chhResourcesApp')

.controller('MainCtrl'
    , function ($rootScope, $scope, $location, Resources) {

  $scope.resources = Resources;

});
