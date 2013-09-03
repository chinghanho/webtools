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
        var cachedResources = cache.get('resources');
        if (!cachedResources) {
          Resource.query({}, function(resources) {
            cache.put('resources', resources);
            if (!!callback) {
              callback(resources);
            }
          });
        }
        else {
          if (!!callback) {
            callback(cachedResources);
          }
        }
        return cachedResources;
      }

    }

  });
