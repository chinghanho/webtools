'use strict';

angular.module('chhResourcesApp')
  .factory('Resources', function($resource) {

    var url     = '/api/resources/:resourceId'
      , params  = {}
      , actions = {};

    return $resource(url, params, actions);

  });
