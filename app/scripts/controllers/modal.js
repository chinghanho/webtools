'use strict';

angular.module('chhResourcesApp')

.controller('ModalCtrl', function ($scope, $http, $rootScope, Resources) {

  var resourceId;

  $scope.resourceModel = {};
  $rootScope.$watch('modalResource', function (newValue, oldValue) {
    resourceId = newValue._id;
    angular.extend($scope.resourceModel, newValue);
  });

  $scope.submitNewResource = function() {

    var resource = new Resources.Service();

    angular.extend(resource, $scope.resourceModel);
    resource.$save(function (resource) {
      Resources.data.push(resource);
      $rootScope.modal.close();
    });
  };

  $scope.submitUpdatedResource = function () {
    var resource = new Resources.Service();

    angular.extend(resource, $scope.resourceModel);
    resource.$update({resourceId: resourceId}, function (resource) {
      $rootScope.modal.close();
    });
  };

});
