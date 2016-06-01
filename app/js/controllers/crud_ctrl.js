const angular = require("angular");
const baseUrl = require("../config").baseUrl;

module.exports = function (app, name, path) {
  app.controller(name, ["sfResource", "sfCounter", function (Resource, sfCounter) {
    var remote;
    var options = {
      errMsgs: {
        getAll: "Unable to retrieve characters!",
        create: "Unable to create character!",
        update: "Unable to update character!",
        remove: "Unable to remove character!"
      }
    };

    this.chars = [];
    this.errors = [];
    this.wins = sfCounter.count;
    remote = new Resource(this.chars, this.errors, baseUrl + path, options);

    this.getChars = remote.getAll.bind(remote);

    this.createChar = function () {
      remote.create(this.newChar)
        .then(() => {
          this.newChar = null;
        });
    }.bind(this);

    this.editChar = function (char) {
      char.backup = angular.copy(char);
      char.editing = true;
    };

    this.updateChar = function (char) {
      remote.update(char)
        .then((bool) => {
          if (bool) {
            char.editing = false;
            delete char.backup;
          }
        });
    };

    this.resetChar = function (char) {
      angular.copy(char.backup, char);
      char.editing = false;
      delete char.backup;
    };

    this.removeChar = remote.remove.bind(remote);
    this.removeErr = remote.removeErr.bind(remote);
  }]);
};
