const baseUrl = require("../../config").baseUrl;

module.exports = function (app) {
  app.controller("BattleCtrl", ["$http", "sfHandleError", function ($http, sfHandleError) {
    this.result = "Click the button to duel!";
    this.errors = [];

    this.battle = function () {
      $http.get(baseUrl + "/battle")
      .then((res) => {
        this.result = res.data.msg;
      }, sfHandleError(this.errors, "Unable to retrieve battle result!"));
    }.bind(this);

    this.removeErr = function (error) {
      this.errors.splice(this.errors.indexOf(error), 1);
    };
  }]);
};
