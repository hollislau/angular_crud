const angular = require("angular");
const scifiApp = angular.module("scifiApp");
const handleError = require(__dirname + "/handle_error");
const baseUrl = "http://localhost:3000/api/battle";

scifiApp.controller("BattleCtrl", ["$http", function ($http) {
  this.result = "";

  this.battle = () => {
    $http.get(baseUrl)
      .then((res) => {
        this.result = res.data.msg;
      }, handleError.bind(this));
  };
}]);
