module.exports = function (app) {
  app.factory("sfHandleError", () => {
    return function (errsArr, message) {
      return function (err) {
        console.log(err);
        if (Array.isArray(errsArr)) {
          errsArr.push(new Error(message || "Server error!"));
        }
      };
    };
  });
};
