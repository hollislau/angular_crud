const angular = require("angular");

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

  describe("REST functionality", () => {
    var $httpBackend;
    var startrekctrl;
    var baseUrl = "http://localhost:3000/api/startrekchars";

    beforeEach(() => {
      angular.mock.inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
      });
      startrekctrl = $controller("StarTrekCtrl");
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("sends a GET request to retrieve characters", () => {
      $httpBackend.expectGET(baseUrl).respond(200, [{ name: "Geordi La Forge" }]);
      startrekctrl.getChars();
      $httpBackend.flush();
      expect(startrekctrl.chars.length).toBe(1);
      expect(startrekctrl.chars[0].name).toBe("Geordi La Forge");
    });

    it("sends a POST request to add a character", () => {
      $httpBackend.expectPOST(baseUrl, { name: "Wesley Crusher" })
        .respond(200, { name: "Wesley Crusher" });
      expect(startrekctrl.chars.length).toBe(0);
      startrekctrl.newChar = { name: "Wesley Crusher" };
      startrekctrl.createChar();
      $httpBackend.flush();
      expect(startrekctrl.chars[0].name).toBe("Wesley Crusher");
      expect(startrekctrl.newChar).toBeNull();
    });

    it("activates character editing", () => {
      startrekctrl.chars = [{ name: "Reginald Barclay" }];
      startrekctrl.editChar(startrekctrl.chars[0]);
      expect(startrekctrl.chars[0].editing).toBe(true);
      expect(startrekctrl.chars[0].backup).toEqual({ name: "Reginald Barclay" });
    });

    it("cancels character editing and resets character properties", () => {
      startrekctrl.chars = [{
        name: "Guinan",
        editing: true,
        backup: { name: "Natasha Yar" }
      }];
      startrekctrl.resetChar(startrekctrl.chars[0]);
      expect(startrekctrl.chars[0].name).toBe("Natasha Yar");
      expect(startrekctrl.chars[0].editing).toBe(false);
      expect(startrekctrl.chars[0].backup).toBeUndefined();
    });

    it("sends a PUT request to update a character", () => {
      $httpBackend.expectPUT(baseUrl + "/1", {
        name: "Beverly Crusher",
        editing: true,
        _id: 1,
        backup: { name: "Katherine Pulaski" }
      }).respond(200);
      startrekctrl.chars = [{
        name: "Beverly Crusher",
        editing: true,
        _id: 1,
        backup: { name: "Katherine Pulaski" }
      }];
      startrekctrl.updateChar(startrekctrl.chars[0]);
      $httpBackend.flush();
      expect(startrekctrl.chars[0].editing).toBe(false);
      expect(startrekctrl.chars[0].backup).toBeUndefined();
    });

    it("sends a DELETE request to remove a character", () => {
      $httpBackend.expectDELETE(baseUrl + "/1").respond(200);
      startrekctrl.chars = [{
        name: "Miles O'Brien",
        _id: 1
      }];
      startrekctrl.removeChar(startrekctrl.chars[0]);
      $httpBackend.flush();
      expect(startrekctrl.chars.length).toBe(0);
    });
  });
});
