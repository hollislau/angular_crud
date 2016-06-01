const angular = require("angular");

describe("Battle controller", () => {
  var battlectrl;

  beforeEach(() => {
    var $controller;

    angular.mock.module("scifiApp");
    angular.mock.inject((_$controller_) => {
      $controller = _$controller_;
    });
    battlectrl = $controller("BattleCtrl");
  });

  it("is a controller", () => {
    expect(typeof battlectrl).toBe("object");
    expect(typeof battlectrl.battle).toBe("function");
  });

  it("links to the counter resource", () => {
    expect(typeof battlectrl.counter).toBe("object");
    expect(typeof battlectrl.counter.addCount).toBe("function");
  });

  it("removes error messages", () => {
    battlectrl.errors.push(new Error("Space-time paradox"));
    battlectrl.removeErr(battlectrl.errors[0]);
    expect(battlectrl.errors.length).toBe(0);
  });

  describe("REST functionality", () => {
    var $httpBackend;
    var baseUrl = "http://localhost:3000/api/battle";

    beforeEach(() => {
      angular.mock.inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("sends a GET request to retrieve a battle result and updates win counters", () => {
      $httpBackend.expectGET(baseUrl).respond(200, {
        winner: { name: "Obi-Wan Kenobi" },
        loser: { name: "James T. Kirk", ship: "Enterprise" },
        msg: "Obi-Wan Kenobi defeats James T. Kirk with a Lightsaber!"
      });
      battlectrl.battle();
      $httpBackend.flush();
      expect(battlectrl.errors.length).toBe(0);
      expect(battlectrl.counter.count.itemOne).toBe(0);
      expect(battlectrl.counter.count.itemTwo).toBe(1);
      expect(battlectrl.result).toBe("Obi-Wan Kenobi defeats James T. Kirk with a Lightsaber!");
    });
  });
});
