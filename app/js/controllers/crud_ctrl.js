const angular = require("angular");
const baseUrl = require("../config").baseUrl;

module.exports = function (app, name, path) {
  app.controller(name, ["$http", "sfHandleError", function ($http, sfHandleError) {
    this.chars = [];
    this.errors = [];

    this.getChars = function () {
      $http.get(baseUrl + path)
      .then((res) => {
        this.chars = res.data;
      }, sfHandleError(this.errors, "Unable to retrieve characters!"));
    }.bind(this);

    this.createChar = function () {
      $http.post(baseUrl + path, this.newChar)
      .then((res) => {
        this.chars.push(res.data);
        this.newChar = null;
      }, sfHandleError(this.errors, "Unable to create character!"));
    }.bind(this);

    this.editChar = function (char) {
      char.backup = angular.copy(char);
      char.editing = true;
    };

    this.updateChar = function (char) {
      $http.put(baseUrl + path + "/" + char._id, char)
      .then(() => {
        char.editing = false;
        delete char.backup;
      }, sfHandleError(this.errors, "Unable to update character!"));
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
      }, sfHandleError(this.errors, "Unable to remove character!"));
    }.bind(this);

    this.removeErr = function (error) {
      this.errors.splice(this.errors.indexOf(error), 1);
    };
  }]);
};
