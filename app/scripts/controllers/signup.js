'use strict';

angular.module('chhResourcesApp')
  .controller('SignupCtrl', function ($rootScope, $scope, $timeout, Auth) {

    $scope.userModel = {};

    $scope.signup = function() {
      Auth.signUp($scope.userModel, null, function(errMsg) {
        $rootScope.alertMsg = errMsg;
        $timeout(function() {
          $rootScope.alertMsg = undefined;
        }, 3500);
      });
    };

  });
