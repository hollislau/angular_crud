module.exports = function (app, angular) {
  require("../../lib").crudCtrl(app, angular, "StarTrekCtrl", "/startrekchars");
};