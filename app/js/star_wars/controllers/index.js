module.exports = function (app) {
  require("../../controllers").crudCtrl(app, "StarWarsCtrl", "/starwarschars");
};
