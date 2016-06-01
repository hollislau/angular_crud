const angular = require("angular");

describe("Battle controller", () => {
  var $controller;

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_$controller_) => {
      $controller = _$controller_;
    });
  });

  it("is a controller", () => {
    var battlectrl = $controller("BattleCtrl");

    expect(typeof battlectrl).toBe("object");
    expect(typeof battlectrl.battle).toBe("function");
  });

  describe("REST functionality", () => {
    var $httpBackend;
    var battlectrl;
    var baseUrl = "http://localhost:3000/api/battle";

    beforeEach(() => {
      angular.mock.inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
      });
      battlectrl = $controller("BattleCtrl");
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("sends a GET request to retrieve a battle result", () => {
      $httpBackend.expectGET(baseUrl).respond(200, {
        msg: "Obi-Wan Kenobi defeats James T. Kirk with a Lightsaber!"
      });
      battlectrl.battle();
      $httpBackend.flush();
      expect(battlectrl.errors.length).toBe(0);
      expect(battlectrl.result).toBe("Obi-Wan Kenobi defeats James T. Kirk with a Lightsaber!");
    });
  });
});
