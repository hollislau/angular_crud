const handleError = require("../../lib").handleError;
const baseUrl = require("../../config").baseUrl;

module.exports = function (app) {
  app.controller("BattleCtrl", ["$http", function ($http) {
    this.result = "Click the button to duel!";

    this.battle = function () {
      $http.get(baseUrl + "/battle")
      .then((res) => {
        this.result = res.data.msg;
      }, handleError.bind(this));
    }.bind(this);
  }]);
};
