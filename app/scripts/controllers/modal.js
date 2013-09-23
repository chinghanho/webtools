'use strict';

angular.module('chhResourcesApp')

.controller('ModalCtrl', function ($scope, $http, $rootScope, Resources) {

  $scope.resourceModel = {};
  // $scope.typeModel = {};

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

  $scope.submitNewType = function() {
    $http.post('/api/types', $scope.typeModel)
      .success(function(data, status, headers, config) {
        if (data && !data.message) {
          $scope.types.push(data);
          $scope.typeModel = {};
        }
        else {
          $location.path('/');
        }
      })
      .error(function(data, status, headers, config) {
        $scope.alertMsg = data;
        $timeout(function() {
          $scope.alertMsg = undefined;
        }, 4500);
      });
  };

})
