'use strict';

angular.module('chhResourcesApp')

.controller('ModalCtrl', function ($scope, $http, $rootScope, Resources) {

  $scope.resourceModel = {};

  $scope.submitNewResource = function() {

    var resource = new Resources.Service();

    resource.name = $scope.resourceModel.name;
    resource.img_url = $scope.resourceModel.img_url;
    resource.description = $scope.resourceModel.description;
    resource.url = $scope.resourceModel.url;
    resource.type = $scope.resourceModel.type;
    resource.$save(function (resource) {
      Resources.data.push(resource);
      $rootScope.modal.close();
    });
  };

});
