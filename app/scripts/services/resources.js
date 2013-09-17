'use strict';

angular.module('chhResourcesApp')
  .factory('Resources', function($resource) {

    var url     = '/api/resources'
      , params  = {}
      , actions = {};

    return $resource(url, params, actions);

  });
