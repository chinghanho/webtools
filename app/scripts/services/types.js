angular.module('chhResourcesApp')
 .factory('typesList', ['$http', '$q', function($http, $q) {
   return {
     types: function() {
       var deferred = $q.defer();

       $http.get('/api/types')
         .success(function(data) {
           console.log('success get types list!');
           deferred.resolve(data);
         })
         .error(function() {
           deferred.reject('An error occured while fetching types.');
         });

       return deferred.promise;
     }
   }
 }])
