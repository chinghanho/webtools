'use strict';

describe('Controller: ResourcesCtrl', function () {

  // load the controller's module
  beforeEach(module('chhResourcesApp', function($provide) {
    $provide.factory('$browser', function() {
      return angular.extend(new angular.mock.$Browser(), {cookieHash: {remember_token:'token_string'}});
    });
  }));

  var ResourcesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {

    scope = $rootScope.$new();
    ResourcesCtrl = $controller('ResourcesCtrl', {
      $scope: scope
    });

  }));

  it('should delete remember_token via cookies when calling destroySession method', inject(function($cookies) {
    expect($cookies).toEqual({remember_token:'token_string'});
    scope.destroySession();
    expect($cookies.remember_token).toBeUndefined();
  }));

});
