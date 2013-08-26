'use strict';

angular.module('chhResourcesApp')
  .factory('resourcesData', ['$http', '$q', function($http, $q) {
    return {
      resources: function() {
        var deferred = $q.defer();

        $http.get('/api/resources')
          .success(function(data) {
            console.log('success get resources data!');
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject('An error occured while fetching resources.');
          });

        return deferred.promise;
      }
    };
  }]);
