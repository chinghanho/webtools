'use strict';

angular.module('chhResourcesApp')

.controller('CommentsCtrl', function (Comments, $scope, $http, $stateParams) {

  $scope.comments = Comments.getCommets({resourceId: $stateParams.resourceId});

  $scope.commentModel = {};

  $scope.submitNewComment = function () {

    $scope.commentModel.resource = $stateParams.resourceId;
    $scope.commentModel.user     = $scope.auth.user.id;

    $http.post('/api/comments', $scope.commentModel)
      .success(function (data) {
        $scope.comments.push(data);
        $scope.commentModel = {};
      })
      .error(function () {
        // $scope.alertMsg = data;
        // $timeout(function() {
        //   $scope.alertMsg = undefined;
        // }, 4500);
      });

  }

});
