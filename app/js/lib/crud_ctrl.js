const handleError = require("./handle_error");
const baseUrl = require("../config").baseUrl;

module.exports = function (app, angular, ctrl, path) {
  app.controller(ctrl, ["$http", function ($http) {
    this.chars = [];

    this.getChars = () => {
      $http.get(baseUrl + path)
      .then((res) => {
        this.chars = res.data;
      }, handleError.bind(this));
    };

    this.createChar = () => {
      $http.post(baseUrl + path, this.newChar)
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
      $http.put(baseUrl + path + "/" + char._id, char)
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
      $http.delete(baseUrl + path + "/" + char._id)
      .then(() => {
        this.chars.splice(this.chars.indexOf(char), 1);
      }, handleError.bind(this));
    };
  }]);
};
