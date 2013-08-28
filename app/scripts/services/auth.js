'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', ['$resource', function($resource) {

    var _user = $resource('/api/sessions/check');

    _user.checkAuth = function(cb) {
      return _user.get(cb);
    };

    return _user;
  }]);
