'use strict';

angular.module('chhResourcesApp')
  .factory('Types', function($resource) {

    var url     = '/api/types'
      , params  = {}
      , actions = {};

    return $resource(url, params, actions);

  });
