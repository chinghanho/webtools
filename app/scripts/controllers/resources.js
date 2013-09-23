'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl'
      , function ($http, $rootScope, $stateParams, $scope, Resources) {

    var resourceId = $stateParams.resourceId;

    $scope.resource = Resources.findById(resourceId);

    // $rootScope.$watch('auth.user', function(newValue) {
    //   if (newValue != null) {
    //     $scope.modal(false);
    //   }
    // });

    // $scope.clickUploader = function() {
    //   $('#cover-image-uploader').click();
    // }

  });
