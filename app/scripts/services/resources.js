'use strict';

angular.module('chhResourcesApp')

.factory('Resources', function ($resource, $rootScope, $q) {

  var url     = '/api/resources/:resourceId'
    , params  = {}
    , actions = {};

  var Service = $resource(url, params, actions);

  var deferred = $q.defer();

  var Resources = {

    data: {},

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
    }

  }

  Service.query({}, function (resources) {
    Resources.data = resources;
    deferred.resolve();
  });

  return Resources;

});
