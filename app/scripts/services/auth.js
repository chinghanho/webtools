'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', function($http) {

    var Auth = {

      user: {},

      isLogged: false,

      login: function() {
        $http.get('/api/sessions/check')
          .success(function(user) {
            Auth.isLogged = true;
            Auth.user = user;
          })
          .error(function(result, status) {
            Auth.isLogged = false;
            Auth.user = null;
          });
      }

    };

    Auth.login();
    return Auth;

  });
