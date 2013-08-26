'use strict';

angular.module('chhResourcesApp')
  .factory('UserRest', ['$resource', function($resource) {

    var user = $resource('/api/sessions/check', {});
    return user;

  }]);
