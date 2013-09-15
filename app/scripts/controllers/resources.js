'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl'
      , function($http, $rootScope, $scope, $location, $routeParams, $cookies, $timeout, Resources) {

    $rootScope.$watch('auth.user', function(newValue) {
      if (newValue != null) {
        $scope.modal(false);
      }
    })

    if (Object.keys($routeParams).length != 0) {

      $scope.resourcesContent = 'showResource';

      $scope.$watch('search', function (newValue, oldValue) {
        if (newValue === oldValue) { return }
        if (newValue.name == '') {
          $scope.resourcesContent = 'showResource';
        }
        else {
          $scope.resourcesContent = null;
        }
      }, true)

      Resources.getResources(function(resources) {
        resources.forEach(function(resource) {
          if (resource._id == $routeParams.resourceId) {
            $scope.resource = resource;
          }
        });
      });

    }
    else if ($location.path() == '/admin') {

      if ($rootScope.auth.isAdmin) {
        $scope.resourcesContent = 'showAdmin';

        $scope.$watch('search', function (newValue, oldValue) {
          if (newValue === oldValue) { return }
          if (newValue.name == '') {
            $scope.resourcesContent = 'showAdmin';
          }
          else {
            $scope.resourcesContent = null;
          }
        }, true)
      }
      else {
        $location.path('/');
      }

    }
    else {
      $scope.resourcesContent = null;
    }

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
