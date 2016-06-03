const angular = require("angular");
const stFormTmplPath = "templates/star_trek/directives/star_trek_form.html";
const stFormTmpl = require("../../../app/templates/star_trek/directives/star_trek_form.html");

describe("CRUD form directive", () => {
  var $httpBackend;
  var $controller;
  var $compile;
  var $scope;
  var $rootScope;

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_$httpBackend_, _$controller_, _$compile_, _$rootScope_) => {
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("creates a directive with a Star Trek controller binding", () => {
    var startrekctrl;
    var link;
    var directive;
    var button;

    $httpBackend.expectGET(stFormTmplPath).respond(200, stFormTmpl);
    startrekctrl = $controller("StarTrekCtrl");
    link = $compile("<div data-ng-controller='StarTrekCtrl as startrekctrl'>" +
      "<star-trek-form data-char='char' data-button-text='stun' data-crud-action='create'>" +
      "</star-trek-form></div>");
    directive = link($scope, "", "", startrekctrl);
    $httpBackend.flush();
    $scope.$digest();
    button = directive.find("button");
    expect(button.text()).toEqual("stun");
  });
});
