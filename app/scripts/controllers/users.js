angular.module('chhResourcesApp')

.controller('UsersCtrl', function ($scope, Auth) {

  $scope.user = Auth.user;

});
