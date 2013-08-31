'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', function($http, $cookieStore) {

    var Auth = {

      user: {},

      isLogged: false,

      signIn: function() {
        $http.get('/api/sessions/check')
          .success(function(user) {
            Auth.isLogged = true;
            Auth.user = user;
          })
          .error(function(result, status) {
            Auth.isLogged = false;
            Auth.user = null;
          });
      },

      signOut: function() {
        $cookieStore.remove('remember_token');
        Auth.isLogged = false;
        Auth.isAdmin = false;
        Auth.user = null;
      }

    };

    Auth.signIn();
    return Auth;

  });
