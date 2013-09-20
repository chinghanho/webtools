'use strict';

angular.module('chhResourcesApp')
  .controller('SigninCtrl', function ($rootScope, $scope, $timeout, Auth) {

    $scope.sessionModel = {};

    $scope.signin = function() {
      Auth.signIn($scope.sessionModel, function(user) {
        $rootScope.infoMsg = 'Welcome! ' + user.login + '.';
        $timeout(function() {
          $rootScope.infoMsg = undefined;
        }, 3500);
        $rootScope.modal.close();
      }, function(errMsg) {
        $rootScope.alertMsg = errMsg;
        $timeout(function() {
          $rootScope.alertMsg = undefined;
        }, 3500);
      });
    };

  });
