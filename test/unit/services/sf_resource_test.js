const angular = require("angular");

describe("Resource service", () => {
  var $httpBackend;
  var $q;
  var Resource;
  var baseUrl = "http://localhost:3000/api/startrekchars";

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_$httpBackend_, _$q_, _sfResource_) => {
      $httpBackend = _$httpBackend_;
      $q = _$q_;
      Resource = _sfResource_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("returns a function", () => {
    expect(typeof Resource).toBe("function");
  });

  it("sends a GET request to retrieve resources", () => {
    var remote;
    var promise;
    var resrcArr = [{}, {}, {}];
    var errsArr = [];

    $httpBackend.expectGET(baseUrl).respond(200, [{ name: "Geordi La Forge" }]);
    remote = new Resource(resrcArr, errsArr, baseUrl);
    promise = remote.getAll();
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(promise instanceof $q).toBe(true);
    expect(resrcArr.length).toBe(1);
    expect(resrcArr[0].name).toBe("Geordi La Forge");
  });

  it("sends a POST request to add a resource", () => {
    var remote;
    var promise;
    var resrcArr = [];
    var errsArr = [];

    $httpBackend.expectPOST(baseUrl, { name: "Wesley Crusher" })
      .respond(200, { name: "Wes Crusher", _id: 0 });
    remote = new Resource(resrcArr, errsArr, baseUrl);
    promise = remote.create({ name: "Wesley Crusher" });
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(promise instanceof $q).toBe(true);
    expect(resrcArr.length).toBe(1);
    expect(resrcArr[0].name).toBe("Wes Crusher");
  });

  it("sends a PUT request to update a resource", () => {
    var remote;
    var promise;
    var resrcArr = [{ name: "Beverly Crusher", _id: 1 }];
    var errsArr = [];

    $httpBackend.expectPUT(baseUrl + "/1", resrcArr[0]).respond(200);
    remote = new Resource(resrcArr, errsArr, baseUrl);
    promise = remote.update(resrcArr[0]);
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(promise instanceof $q).toBe(true);
  });

  it("sends a DELETE request to remove a resource", () => {
    var remote;
    var promise;
    var resrcArr = [{ name: "Miles O'Brien", _id: 2 }];
    var errsArr = [];

    $httpBackend.expectDELETE(baseUrl + "/2").respond(200);
    remote = new Resource(resrcArr, errsArr, baseUrl);
    promise = remote.remove(resrcArr[0]);
    $httpBackend.flush();
    expect(errsArr.length).toBe(0);
    expect(promise instanceof $q).toBe(true);
    expect(resrcArr.length).toBe(0);
  });
});
