'use strict';

describe('Service: Auth', function () {

  // load the controller's module
  beforeEach(module('chhResourcesApp'));

  var $httpBackend, $rootScope, $controller, mockAuth;

  var notFound = {
    "message": "Not Found"
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $injector) {

    $httpBackend = $injector.get('$httpBackend');
    mockAuth = $injector.get('Auth');
    $httpBackend.whenGET('/api/sessions/check').respond(notFound);

  }));

  it('should check current authentication', inject(function() {

    var result = mockAuth.checkAuth();
    $httpBackend.flush();
    expect(result.message).toBe(notFound.message);

  }));

});
