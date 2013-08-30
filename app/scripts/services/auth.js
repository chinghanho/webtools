'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', ['$http', '$rootScope', function($http, $rootScope) {

    var auth = {};

    auth.broadcastAuthEvent = function() {
      $rootScope.$broadcast('authEvent');
    };

    auth.isLoggedIn = false;

    auth.client = new SimpleAuth(function(user) {
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
