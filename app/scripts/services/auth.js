'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', function($http, $cookieStore) {

    var Auth = {

      user: {},

      isLogged: false,
      isAdmin: false,

      signIn: function(data) {
        $http.post('/api/sessions', data || {})
          .success(function(user) {
            Auth.isLogged = true;
            Auth.user = user;
            if (user.role == 'admin') {
              Auth.isAdmin = true;
            }
          })
          .error(function(result, status) {
            Auth.isLogged = false;
            Auth.isAdmin = false;
            Auth.user = null;
          });
      },

      signUp: function(data) {
        $http.post('/api/users', data)
          .success(function(user) {
            Auth.isLogged = true;
            Auth.user = user;
            if (user.role == 'admin') {
              Auth.isAdmin = true;
            }
          })
          .error(function(result, status) {
            Auth.isLogged = false;
            Auth.isAdmin = false;
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
