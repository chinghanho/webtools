'use strict';

angular.module('chhResourcesApp')
  .controller('ResourcesCtrl'
      , function ($http, $rootScope, $stateParams, $scope, $state, Resources) {

    var resourceId = $stateParams.resourceId;

    $scope.resource = Resources.findById(resourceId);

    // $scope.clickUploader = function() {
    //   $('#cover-image-uploader').click();
    // }

    $rootScope.$watch('search.name', function (newValue, oldValue) {

      if (newValue === oldValue) { return };

      $scope.searching = 'index';
      if (newValue === '') {
        $scope.searching = 'show';
      };

    });

  });
