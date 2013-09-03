'use strict';

angular.module('chhResourcesApp')
  .factory('Resources', function($resource) {

    var actions = {
      index: {method: 'GET', params: {_method: 'index'}}
    }

    return $resource('/api/resources', {}, actions);

    // return {
    //   resources: function() {
    //     var deferred = $q.defer();

    //     $http.get('/api/resources')
    //       .success(function(data) {
    //         deferred.resolve(data);
    //       })
    //       .error(function() {
    //         deferred.reject('An error occured while fetching resources.');
    //       });

    //     return deferred.promise;
    //   }
    // };

  });
