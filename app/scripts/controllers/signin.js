'use strict';

angular.module('chhResourcesApp')
  .controller('SigninCtrl', function ($rootScope, $scope, $timeout, Auth) {

    $scope.sessionModel = {};

    $scope.signin = function() {
      Auth.signIn($scope.sessionModel, null, function(errMsg) {
        $rootScope.alertMsg = errMsg;
        $timeout(function() {
          $rootScope.alertMsg = undefined;
        }, 3500);
      });
    };

  });
