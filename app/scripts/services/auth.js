'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', ['$resource', function($resource) {

    var _user = $resource('/api/sessions/check');

    _user.checkAuth = function() {
      return _user.get();
    }

    return _user;
  }]);
