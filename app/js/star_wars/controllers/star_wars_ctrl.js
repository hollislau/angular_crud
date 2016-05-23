const handleError = require("../../lib").handleError;
const baseUrl = require("../../config").baseUrl;

module.exports = function (app, angular) {
  app.controller("StarWarsCtrl", ["$http", function ($http) {
    this.chars = [];

    this.getChars = () => {
      $http.get(baseUrl + "/starwarschars")
      .then((res) => {
        this.chars = res.data;
      }, handleError.bind(this));
    };

    this.createChar = () => {
      $http.post(baseUrl + "/starwarschars", this.newChar)
      .then((res) => {
        this.chars.push(res.data);
        this.newChar = null;
      }, handleError.bind(this));
    };

    this.editChar = (char) => {
      char.backup = angular.copy(char);
      char.editing = true;
    };

    this.updateChar = (char) => {
      delete char.backup;
      $http.put(baseUrl + "/starwarschars/" + char._id, char)
      .then(() => {
        char.editing = false;
      }, handleError.bind(this));
    };

    this.resetChar = (char) => {
      angular.copy(char.backup, char);
      char.editing = false;
      delete char.backup;
    };

    this.removeChar = (char) => {
      $http.delete(baseUrl + "/starwarschars/" + char._id)
      .then(() => {
        this.chars.splice(this.chars.indexOf(char), 1);
      }, handleError.bind(this));
    };
  }]);
};
