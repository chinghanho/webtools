angular.module('chhResourcesApp')
  .directive('contenteditable', [function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elem, attrs, ngModel) {

        if (!ngModel) return;

        elem.on('blur keyup change', function() {
          scope.$apply(function() {
            ngModel.$setViewValue(elem.html());
          });
        });

        ngModel.$render = function() {
          elem.html(ngModel.$viewValue);
        }

        ngModel.$setViewValue(elem.html());

        if (attrs.cePlaceholder) {
          var placeholder = attrs.cePlaceholder;
          ngModel.$setViewValue(elem.html(placeholder));
          elem.on('focus', function() {
            if (elem.html() == placeholder) {
              ngModel.$setViewValue(elem.html(''));
            }
          })
        }

        // mix length validator
        if (attrs.ceMinlength) {
          var minlength = attrs.ceMinlength;
          var minLengthValidator = function(viewValue) {
            if (!isEmpty(viewValue) && viewValue.length >= minlength) {
              ngModel.$setValidity('minlength', true);
              return viewValue;
            }
            else {
              ngModel.$setValidity('minlength', false);
              return undefined;
            }
          }

          ngModel.$parsers.push(minLengthValidator);
          ngModel.$formatters.push(minLengthValidator);
        }

        // max length validator
        if (attrs.ceMaxlength) {
          var maxlength = attrs.ceMaxlength;
          var maxLengthValidator = function(viewValue) {
            if (!isEmpty(viewValue) && viewValue.length <= maxlength) {
              ngModel.$setValidity('maxlength', true);
              return viewValue;
            }
            else {
              ngModel.$setValidity('maxlength', false);
              return undefined;
            }
          }

          ngModel.$parsers.push(maxLengthValidator);
          ngModel.$formatters.push(maxLengthValidator);
        }

        // url validator
        if (attrs.ceUrl) {
          var URL_REGEXP = new RegExp(attrs.ceUrl);
          var urlValidator = function(viewValue) {
            if (!isEmpty(viewValue) && URL_REGEXP.test(viewValue)) {
              ngModel.$setValidity('url', true);
              return viewValue;
            }
            else {
              ngModel.$setValidity('url', false);
              return undefined;
            }
          }

          ngModel.$parsers.push(urlValidator);
          ngModel.$formatters.push(urlValidator);
        }

      }
    }
  }])

function isEmpty(value) {
  return angular.isUndefined(value) || value === '' || value === null || value !== value;
}
