'use strict';

angular.module('chhResourcesApp')

.factory('Types', function ($resource) {

  var url     = '/api/types'
    , params  = {}
    , actions = {};

  var Service = $resource(url, params, actions);

  var Types = {

    data: {},

    Service: Service

  };

  Service.query({}, function (types) {
    Types.data = types;
  });

  return Types;

});
