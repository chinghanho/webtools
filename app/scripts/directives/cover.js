'use strict';

angular.module('chhResourcesApp')

.directive('cover', function ($state) {

  var linker = function (scope, elem, attrs) {

    //

  }

  return {
    restrict: 'E',
    template: '<div class="cover">'
      + '<div class="cover-wrapper">'
      + '<div class="cover-inner">'
      + '<div class="hero-unit">'
      + '<p>Top Resources<br>For Web Development<br>And Web Design!</p>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>',
    link: linker
  }

})
