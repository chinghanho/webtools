'use strict'

angular.module('chhResourcesApp')

  .controller('MainCtrl'
      , function ($rootScope, $scope, $location, typesList, Auth) {

    typesList.types().then(function(types) {
      $scope.types = types;
    });

    $rootScope.auth = Auth;
    $rootScope.search = {};

    /**
     * Modal Control
     */

    $scope.showModal = false;
    $scope.modal = function(arg) {

      if (arg == 'newResource') {
        if ($rootScope.auth.isLogged) {
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

    function clearModalContent() {
      $scope.modalContent = null;
    }

  });
