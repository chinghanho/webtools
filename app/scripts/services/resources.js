'use strict';

angular.module('chhResourcesApp')
  .factory('Resources', function($resource, $cacheFactory) {

    var actions = {
      index: {method: 'GET', params: {_method: 'index'}}
    }

    var cache    = $cacheFactory('Resources')
      , Resource = $resource('/api/resources', {}, actions);

    return {

      getResources: function(callback) {
        var resources = cache.get('resources');
        if (!resources) {
          resources = Resource.query({}, callback);
          cache.put('resources', resources);
        }
        else {
          callback(resources);
        }
        return resources;
      }

    }

  });
