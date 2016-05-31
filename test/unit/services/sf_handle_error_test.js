const angular = require("angular");

describe("Error handling service", () => {
  var sfHandleError;

  beforeEach(() => {
    angular.mock.module("scifiApp");
    angular.mock.inject((_sfHandleError_) => {
      sfHandleError = _sfHandleError_;
    });
  });

  it("returns a function", () => {
    expect(typeof sfHandleError()).toBe("function");
  });

  it("adds an error to the errors array", () => {
    var testArr = [];

    sfHandleError(testArr, "May the Force be with you")();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe("May the Force be with you");
  });
});
