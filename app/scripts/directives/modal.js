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
      if (oldValue === newValue) { return }

      if (!newValue || newValue === '') {
        angular.element('body').removeClass('modal-enabled');
        elem.html('');
      }
      else if (!!newValue) {

        var loader = getTemplate(scope.show);

        loader.success(function (template) {
          elem.html('<div class="modal-container">'
          + '<div class="modal__wrapper">'
          + '<div class="modal-wrapper-inner">'
          + '<div class="modal__content">'
          + template
          + '</div>'
          + '<div ng-click="modal.close()" class="modal__close-button">&times;</div>'
          + '</div>'
          + '</div>'
          + '</div>');
        })
        .then(function () {
          elem.html($compile(elem.html())(scope.$root));
        })
        .then(function () {
          angular.element('body').addClass('modal-enabled');
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
