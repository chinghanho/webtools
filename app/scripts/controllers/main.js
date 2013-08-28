'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl', ['$scope', 'resourcesData', 'typesList',
    function ($scope, resourcesData, typesList) {

    // resourcesData.resources().then(function(resources) {
    //   $scope.resources = resources;
    // });

    // typesList.types().then(function(types) {
    //   $scope.types = types;
    // });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  }]);
