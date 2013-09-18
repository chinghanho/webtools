'use strict';

angular.module('chhResourcesApp')

.directive('modal', function ($http, $templateCache) {

  var getTemplate = function (contentType) {
    var templateLoader;

    var templateMap = {
      signUp: '/views/users/new.html',
      signIn: '/views/sessions/new.html',
      newResource: '/views/resources/new.html'
    };

    var templateUrl = templateMap[contentType];

    templateLoader = $http.get(templateUrl, {cache: $templateCache});

    return templateLoader;
  }

  var linker = function (scope, elem, attrs) {

    var loader = getTemplate(scope.show);

    loader.success(function (template) {
      elem.html(template);
    })
    .then(function (response) {
      elem.replaceWith($compile(elem.html())(scope));
    });

  }

  return {
    scope: {
      show: '='
    },
    restrict: 'E',
    link: linker
  };
})
