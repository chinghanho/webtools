'use strict';

angular.module('chhResourcesApp')
  .factory('Auth', ['$http', 'UserRest', function($http, UserRest) {
    var _user = UserRest.get();

    return {

      currentUser: _user

    };
  }]);
