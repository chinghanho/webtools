'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl', ['$http','$rootScope', '$scope', '$route', '$parse', '$filter', '$routeParams', '$cookies',
    function ($http, $rootScope, $scope, $route, $filter, $parse, $routeParams, $cookies) {

    if (Object.keys($routeParams).length != 0) {

      // Route to Resource

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
    else {

      // Route to Resources

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
    }

    /**
     * Submit Action!
     */

    $scope.resourceModel = {};
    $scope.sessionModel = {};
    $scope.userModel = {};

    $scope.submitNewResource = function() {
      $http.post('/api/resources', $scope.resourceModel)
        .success(function(data, status, headers, config) {
          console.log('Create new resource successfully.');
          $scope.modal(false);
          $scope.resources.push(data);
        })
        .error(function(data, status, headers, config) {
          console.log('Submit new resource failed');
        })
    }

    $scope.submitNewSession = function() {
      $http.post('/api/sessions', $scope.sessionModel)
        .success(function(data, status, headers, config) {
          if (data && !data.message) {
            $rootScope.isLogged = !$rootScope.isLogged;
            clearModelValues($scope.sessionModel);
            $scope.modal(false);
          }
          else {
            console.log(data.message);
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
          console.log('New user failed.');
        });
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
