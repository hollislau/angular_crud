const angular = require("angular");
const handleError = require("../lib").handleError;
const baseUrl = require("../config").baseUrl;

module.exports = function (app, name, path) {
  app.controller(name, ["$http", function ($http) {
    this.chars = [];

    this.getChars = function () {
      $http.get(baseUrl + path)
      .then((res) => {
        this.chars = res.data;
      }, handleError.bind(this));
    }.bind(this);

    this.createChar = function () {
      $http.post(baseUrl + path, this.newChar)
      .then((res) => {
        this.chars.push(res.data);
        this.newChar = null;
      }, handleError.bind(this));
    }.bind(this);

    this.editChar = function (char) {
      char.backup = angular.copy(char);
      char.editing = true;
    };

    this.updateChar = function (char) {
      delete char.backup;
      $http.put(baseUrl + path + "/" + char._id, char)
      .then(() => {
        char.editing = false;
      }, handleError.bind(this));
    }.bind(this);

    this.resetChar = function (char) {
      angular.copy(char.backup, char);
      char.editing = false;
      delete char.backup;
    };

    this.removeChar = function (char) {
      $http.delete(baseUrl + path + "/" + char._id)
      .then(() => {
        this.chars.splice(this.chars.indexOf(char), 1);
      }, handleError.bind(this));
    }.bind(this);
  }]);
};
