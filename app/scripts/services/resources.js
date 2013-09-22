'use strict';

angular.module('chhResourcesApp')

.service('ResourcesService', function ($resource) {

  var url     = '/api/resources/:resourceId'
    , params  = {}
    , actions = {};

  this.getResources = function () {
    return $resource(url, params, actions);
  }

})

.factory('Resources', function (ResourcesService) {

  var Resources = {

    data: {}

  }

  ResourcesService.getResources().query({}, function (resources) {
    Resources.data = resources;
  });

  return Resources;

});
