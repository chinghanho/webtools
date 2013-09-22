'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl'
      , function($http, $rootScope, $stateParams, $scope, ResourcesService) {

    var resourceId = $stateParams.resourceId;

    ResourcesService.getResources().get({resourceId: resourceId}, function (resource) {
      $scope.resource = resource;
    });

    // $rootScope.$watch('auth.user', function(newValue) {
    //   if (newValue != null) {
    //     $scope.modal(false);
    //   }
    // });

    // $scope.clickUploader = function() {
    //   $('#cover-image-uploader').click();
    // }

  });
