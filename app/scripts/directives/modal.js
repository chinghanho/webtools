angular.module('chhResourcesApp')
  .directive('modal', [function () {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        elem.bind('click', function(event) {
          if (_.contains($(event.target).parents(), $('div.modal__content')[0])) {
            return
          }

          if (scope.showModal) {
            scope.modal(false);
          }
          else {
            return
          }
          scope.$apply();
        })
      }
    };
  }]);
