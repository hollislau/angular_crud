const baseUrl = require("../../config").baseUrl;

module.exports = function (app) {
  app.controller("BattleCtrl", ["$http", "sfHandleError", "sfCounter",
    function ($http, sfHandleError, sfCounter) {
      this.result = "Click the button to duel!";
      this.counter = sfCounter;
      this.errors = [];

      this.battle = function () {
        $http.get(baseUrl + "/battle")
        .then((res) => {
          this.result = res.data.msg;
          if (res.data.winner) {
            if (res.data.winner.ship) {
              return this.counter.addCount("itemOne");
            }
            this.counter.addCount("itemTwo");
          }
        }, sfHandleError(this.errors, "Unable to retrieve battle result!"));
      }.bind(this);

      this.removeErr = function (error) {
        this.errors.splice(this.errors.indexOf(error), 1);
      }.bind(this);
    }]);
};
