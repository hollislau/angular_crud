module.exports = function (app) {
  require("../../controllers").crudCtrl(app, "StarTrekCtrl", "/startrekchars", "countOne");
};
