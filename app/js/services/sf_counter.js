module.exports = function (app) {
  app.factory("sfCounter", () => {
    return {
      countOne: 0,
      countTwo: 0,
      addCount: function (counter) {
        this[counter]++;
      }
    };
  });
};
