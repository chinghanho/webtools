'use strict';

angular.module('chhResourcesApp')
  .controller('SignupCtrl', function ($scope, Auth) {

    $scope.userModel = {};

    $scope.signup = function() {
      Auth.signUp($scope.userModel);
    }

  });
