'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('chhResourcesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of resources to the scope', function () {
    expect(scope.resources.length).toBe(12);
  });
});
