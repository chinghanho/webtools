'use strict';

angular.module('chhResourcesApp')

.factory('Comments', function ($resource) {

  var actions = {
    getCommets: { method: 'GET', isArray: true }
  };

  return $resource('/api/resources/:resourceId/comments', {}, actions);

});
