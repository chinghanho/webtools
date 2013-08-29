'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', ['$http', '$rootScope', function($http, $rootScope) {

    var auth = {};

    function simpleAuth(callback) {
      this.check = function() {
        $http.get('/api/sessions/check')
          .success(function(result) {
            callback(result);
          });
      };
    }

    auth.broadcastAuthEvent = function() {
      $rootScope.$broadcast('authEvent');
    };

    auth.client = new simpleAuth(function(user) {
      if (user) {
        auth.user = user;
        auth.broadcastAuthEvent();
      }
      else {
        auth.user = null;
        auth.broadcastAuthEvent();
      }
    });

    auth.check = function() {
      this.client.check();
    };

    return auth;

  }]);
