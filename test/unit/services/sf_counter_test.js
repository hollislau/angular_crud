const angular = require("angular");

describe("Counter service", () => {
  var sfCounter;

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_sfCounter_) => {
      sfCounter = _sfCounter_;
    });
  });

  it("returns an object", () => {
    expect(typeof sfCounter).toBe("object");
  });

  it("increments counters", () => {
    sfCounter.addCount("itemTwo");
    expect(sfCounter.count.itemOne).toBe(0);
    expect(sfCounter.count.itemTwo).toBe(1);
  });
});
