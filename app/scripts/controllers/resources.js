'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl'
      , function($http, $rootScope, $scope, $timeout, Resources) {

    $rootScope.$watch('auth.user', function(newValue) {
      if (newValue != null) {
        $scope.modal(false);
      }
    })

    // $scope.clickUploader = function() {
    //   $('#cover-image-uploader').click();
    // }

    /**
     * Submit Action!
     */

    $scope.resourceModel = {};
    $scope.typeModel = {};

    $scope.submitNewResource = function() {
      $http.post('/api/resources', $scope.resourceModel)
        .success(function(data, status, headers, config) {
          $scope.resources.push(data);
          $scope.modal(false);
        })
        .error(function(data, status, headers, config) {
          $scope.alertMsg = data;
          $timeout(function() {
            $scope.alertMsg = undefined;
          }, 4500);
        })
    }

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
        })
    }

    /**
     * Private functions
     */

    function clearModelValues(model) {
      for (var i in model) {
        model[i] = ""
      }
    }
  });
