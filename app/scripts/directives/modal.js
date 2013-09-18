'use strict';

angular.module('chhResourcesApp')

.directive('modal', function ($http, $templateCache, $compile) {

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

    scope.$watch('show', function (newValue, oldValue) {
      if (!!newValue) {

        var loader = getTemplate(scope.show);

        loader.success(function (template) {
          elem.html('<div class="modal-container">'
          + '<div class="modal__wrapper">'
          + '<div class="modal__wrapper-inner">'
          + '<div class="modal__content" ng-switch on="modalContent">'
          + '</div>'
          + template
          + '<div ng-click="modal(false)" class="modal__close-button">&times;</div>'
          + '</div>'
          + '</div>'
          + '</div>');
        })
        .then(function () {
          elem.replaceWith($compile(elem.html())(scope));
        });

      }
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
