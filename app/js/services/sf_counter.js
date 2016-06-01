module.exports = function (app) {
  app.factory("sfCounter", () => {
    return {
      count: {
        itemOne: 0,
        itemTwo: 0
      },
      addCount: function (counter) {
        this.count[counter]++;
      }
    };
  });
};
