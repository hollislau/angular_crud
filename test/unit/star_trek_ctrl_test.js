var angular = require("angular");
require("angular-mocks");

describe("Star Trek controller", () => {
  var $controller;

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_$controller_) => {
      $controller = _$controller_;
    });
  });

  it("is a controller", () => {
    var startrekctrl = $controller("StarTrekCtrl");

    expect(typeof startrekctrl).toBe("object");
    expect(typeof startrekctrl.getChars).toBe("function");
  });
});
