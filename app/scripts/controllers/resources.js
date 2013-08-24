'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl', ['$http','$rootScope', '$scope', '$location', '$parse', '$filter', '$routeParams', '$cookies', '$timeout',
    function ($http, $rootScope, $scope, $location, $filter, $parse, $routeParams, $cookies, $timeout) {

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

      $scope.resources.forEach(function(resource) {
        if (resource._id == $routeParams.resourceId) {
          $scope.resource = resource;
        }
      })

    }
    else if ($location.path() == '/admin') {

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
      $scope.resourcesContent = null;
    }

    /**
     * Modal Control
     */

    $scope.showModal = false;
    $scope.modal = function(arg) {

      if (arg == 'newResource') {
        if ($scope.isLogged) {
          $scope.modalContent = 'newResource';
          $scope.showModal = true;
        }
        else {
          $scope.modalContent = 'signIn';
          $scope.showModal = true;
        }
      }
      else if (arg == 'signIn') {
        $scope.modalContent = 'signIn';
        $scope.showModal = true;
      }
      else if (arg == 'signUp') {
        $scope.showModal = true;
        $scope.modalContent = 'signUp';
      }
      else if (arg) {
        clearModalContent();
        $scope.showModal = true;
        $scope.modalResource = arg;
      }
      else {
        clearModalContent();
        $scope.showModal = false;
      }

      if ($scope.showModal) {
        $('body').addClass('modal-enabled');
        $('.modal__overlay').addClass('modal-enabled');
      }
      else {
        $('body').removeClass('modal-enabled');
        $('.modal__overlay').removeClass('modal-enabled');
      }

    }

    // $scope.clickUploader = function() {
    //   $('#cover-image-uploader').click();
    // }

    $scope.destroySession = function() {
      delete $cookies.remember_token;
      $rootScope.isLogged = !$rootScope.isLogged;
      $scope.infoMsg = 'Sign out successfully.';
      $timeout(function() {
        $scope.infoMsg = undefined;
      }, 4500);
    }

    /**
     * Submit Action!
     */

    $scope.resourceModel = {};
    $scope.sessionModel = {};
    $scope.userModel = {};
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

    $scope.submitNewSession = function() {
      $http.post('/api/sessions', $scope.sessionModel)
        .success(function(data, status, headers, config) {
          if (data && !data.message) {
            $rootScope.isLogged = !$rootScope.isLogged;
            if (data.role == 'admin') { $rootScope.isAdmin = true };
            clearModelValues($scope.sessionModel);
            $scope.modal(false);
          }
          else {
            $scope.alertMsg = data.message;
            $timeout(function() {
              $scope.alertMsg = undefined;
            }, 4500);
          }
        })
        .error(function(data, status, headers, config) {
          console.log('New session failed.');
        });
    }

    $scope.submitNewUser = function() {
      $http.post('/api/users', $scope.userModel)
        .success(function(data, status, headers, config) {
          $rootScope.isLogged = !$rootScope.isLogged;
          clearModelValues($scope.userModel);
          $scope.modal(false);
        })
        .error(function(data, status, headers, config) {
          $scope.alertMsg = data;
          $timeout(function() {
            $scope.alertMsg = undefined;
          }, 4500);
        });
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

    function clearModalContent() {
      $scope.modalContent = null;
    }

    function clearModelValues(model) {
      for (var i in model) {
        model[i] = ""
      }
    }
  }]);
