'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl', ['$http', '$scope', '$route', '$parse', '$filter', '$routeParams',
    function ($http, $scope, $route, $filter, $parse, $routeParams) {

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

    $scope.resourceModel = {
      name: "",
      description: "",
      img_url: "",
      url: "",
      type: ""
    };

    $scope.sessionModel = $scope.userModel = {
      username: "",
      password: ""
    }

    /**
     * Modal Control
     */

    $scope.showModal = false;
    $scope.modal = function(arg) {

      if (arg == 'newResource') {
        $scope.modalContent = 'newResource';
        $scope.showModal = true;
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

    /**
     * Filter
     */

    $scope.resourceType = function(resourceTypeId) {
      var resourceType = '';
      angular.forEach($scope.types, function(value, index) {
        if (value._id == resourceTypeId) { resourceType = value.name; }
      })
      return resourceType;
    }

    /**
     * Name Editor
     */

    $scope.enableNameEditor = function() {
      $scope.nameEditorDisabled = false;
    }

    $scope.disableNameEditor = function() {
      $scope.nameEditorDisabled = true;
    }

    $scope.nameEditorDone = function($event) {
      $scope.disableNameEditor();
      $event.preventDefault();
    }

    /**
     * Description Editor
     */

    $scope.enableDescriptionEditor = function() {
      $scope.descriptionEditorDisabled = false;
    }

    $scope.disableDescriptionEditor = function() {
      $scope.descriptionEditorDisabled = true;
    }

    $scope.descriptionEditorDone = function($event) {
      $scope.disableDescriptionEditor();
      $event.preventDefault();
    }

    /**
     * URL Editor
     */

    $scope.enableUrlEditor = function() {
      $scope.urlEditorDisabled = false;
    }

    $scope.disableUrlEditor = function() {
      $scope.urlEditorDisabled = true;
    }

    $scope.urlEditorDone = function($event) {
      $scope.disableUrlEditor();
      $event.preventDefault();
    }

    /**
     * Submit Action!
     */

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
          console.log('Create new session successfully.');
          $scope.modal(false);
        })
        .error(function() {
          console.log('New session failed.');
        });
    }

    $scope.submitNewUser = function() {
      $http.post('/api/users', $scope.userModel)
        .success(function(data, status, headers, config) {
          console.log('Create new user successfully.');
          $scope.modal(false);
        })
        .error(function() {
          console.log('New user failed.');
        });
    }

    /**
     * Private functions
     */

    function clearModalContent() {
      $scope.modalContent = null;
    }
  }]);
