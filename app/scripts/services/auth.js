angular.module('chhResourcesApp')
  .factory('Auth', [function() {
    return {
      isLogged: false,
      username: ''
    }
  }])
