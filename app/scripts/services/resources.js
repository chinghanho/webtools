'use strict';

angular.module('chhResourcesApp')

.factory('Resources', function ($resource, $rootScope, $q) {

  var url     = '/api/resources/:resourceId'
    , params  = {}
    , actions = {
      update: {method: 'PUT'}
    };

  var Service = $resource(url, params, actions);

  var deferred = $q.defer()
    , page = page || 1;

  var Resources = {

    data: {},
    busy: false,

    findById: function (id) {

      var result;

      var promised = deferred.promise
        .then(function () {
          angular.forEach(Resources.data, function (resource) {
            if (resource._id === id) {
              result = resource;
            }
          });
        })
        .then(function () {
          return result;
        });

      return promised;
    },

    moreResources: function () {

      if (Resources.busy) { return }
      Resources.busy = true;
      page += 1;

      Service.query({page: page}, function (resources) {
        if (!resources.length) {
          Resources.busy = false;
          page -= 1;
          return
        }
        Resources.data = Resources.data.concat(resources);
        Resources.busy = false;
      });
    },

    Service: Service

  }

  Service.query({}, function (resources) {
    Resources.data = resources;
    deferred.resolve();
  });

  return Resources;

});
