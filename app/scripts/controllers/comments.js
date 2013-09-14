'use strict';

angular.module('chhResourcesApp')

.controller('CommentsCtrl', function (Comments, $scope, $http, $routeParams) {

  $scope.comments = Comments.getCommets({resourceId: $routeParams.resourceId});

  $scope.commentModel = {};

  $scope.submitNewComment = function () {

    $scope.commentModel.resource = $routeParams.resourceId;
    $scope.commentModel.user     = $scope.auth.user.id;

    $http.post('/api/comments', $scope.commentModel)
      .success(function (data) {
        $scope.comments.push(data);
        $scope.modal(false);
      })
      .error(function () {
        // $scope.alertMsg = data;
        // $timeout(function() {
        //   $scope.alertMsg = undefined;
        // }, 4500);
      });

  }

});
