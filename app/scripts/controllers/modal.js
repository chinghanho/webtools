'use strict';

angular.module('chhResourcesApp')

.controller('ModalCtrl', function ($scope, $http, $rootScope, Resources) {

  $scope.resourceModel = {};
  // $scope.typeModel = {};

  $scope.submitNewResource = function() {
    $http.post('/api/resources', $scope.resourceModel)
      .success(function(data, status, headers, config) {
        Resources.data.push(data);
        $rootScope.modal.close();
      })
      .error(function(data, status, headers, config) {
        $scope.alertMsg = data;
        $timeout(function() {
          $scope.alertMsg = undefined;
        }, 4500);
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
