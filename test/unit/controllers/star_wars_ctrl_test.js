const angular = require("angular");

describe("Star Wars controller", () => {
  var starwarsctrl;

  beforeEach(() => {
    var $controller;

    angular.mock.module("scifiApp");
    angular.mock.inject((_$controller_) => {
      $controller = _$controller_;
    });
    starwarsctrl = $controller("StarWarsCtrl");
  });

  it("is a controller", () => {
    expect(typeof starwarsctrl).toBe("object");
    expect(typeof starwarsctrl.getChars).toBe("function");
  });

  it("links to the counter resource", () => {
    expect(typeof starwarsctrl.wins).toBe("object");
    expect(starwarsctrl.wins.itemTwo).toBe(0);
  });

  it("activates character editing", () => {
    starwarsctrl.chars.push({ name: "Boba Fett" });
    starwarsctrl.editChar(starwarsctrl.chars[0]);
    expect(starwarsctrl.chars[0].editing).toBe(true);
    expect(starwarsctrl.chars[0].backup).toEqual({ name: "Boba Fett" });
  });

  it("cancels character editing and resets character properties", () => {
    starwarsctrl.chars.push({
      name: "Lando Calrissian",
      editing: true,
      backup: { name: "Gial Ackbar" }
    });
    starwarsctrl.resetChar(starwarsctrl.chars[0]);
    expect(starwarsctrl.chars[0].name).toBe("Gial Ackbar");
    expect(starwarsctrl.chars[0].editing).toBe(false);
    expect(starwarsctrl.chars[0].backup).toBeUndefined();
  });

  it("removes error messages", () => {
    starwarsctrl.errors.push(new Error("I have a bad feeling about this"));
    starwarsctrl.removeErr(starwarsctrl.errors[0]);
    expect(starwarsctrl.errors.length).toBe(0);
  });

  describe("REST functionality", () => {
    var $httpBackend;
    var baseUrl = "http://localhost:3000/api/starwarschars";

    beforeEach(() => {
      angular.mock.inject((_$httpBackend_) => {
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("sends a GET request to retrieve characters", () => {
      $httpBackend.expectGET(baseUrl).respond(200, [{ name: "C-3PO" }]);
      starwarsctrl.getChars();
      $httpBackend.flush();
      expect(starwarsctrl.errors.length).toBe(0);
      expect(starwarsctrl.chars.length).toBe(1);
      expect(starwarsctrl.chars[0].name).toBe("C-3PO");
    });

    it("sends a POST request to add a character", () => {
      $httpBackend.expectPOST(baseUrl, { name: "R2-D2" })
        .respond(200, { name: "R2", _id: 1 });
      expect(starwarsctrl.chars.length).toBe(0);
      starwarsctrl.newChar = { name: "R2-D2" };
      starwarsctrl.createChar();
      $httpBackend.flush();
      expect(starwarsctrl.errors.length).toBe(0);
      expect(starwarsctrl.chars[0].name).toBe("R2");
      expect(starwarsctrl.chars[0]._id).toBe(1);
      expect(starwarsctrl.newChar).toBeNull();
    });

    it("sends a PUT request to update a character", () => {
      $httpBackend.expectPUT(baseUrl + "/1", {
        name: "Jabba the Hutt",
        editing: true,
        _id: 1,
        backup: { name: "BB-8" }
      }).respond(200);
      starwarsctrl.chars.push({
        name: "Jabba the Hutt",
        editing: true,
        _id: 1,
        backup: { name: "BB-8" }
      });
      starwarsctrl.updateChar(starwarsctrl.chars[0]);
      $httpBackend.flush();
      expect(starwarsctrl.errors.length).toBe(0);
      expect(starwarsctrl.chars[0].editing).toBe(false);
      expect(starwarsctrl.chars[0].backup).toBeUndefined();
    });

    it("sends a DELETE request to remove a character", () => {
      $httpBackend.expectDELETE(baseUrl + "/1").respond(200);
      starwarsctrl.chars.push({
        name: "Anakin Skywalker",
        _id: 1
      });
      starwarsctrl.removeChar(starwarsctrl.chars[0]);
      $httpBackend.flush();
      expect(starwarsctrl.errors.length).toBe(0);
      expect(starwarsctrl.chars.length).toBe(0);
    });
  });
});
