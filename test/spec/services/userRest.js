'use strict';

describe('Service: userRest', function () {

  // load the controller's module
  beforeEach(module('chhResourcesApp'));

  var $httpBackend, $rootScope, $controller;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $injector) {

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('/api/sessions/check').respond([]);

    $httpBackend.flush();

  }));

});
