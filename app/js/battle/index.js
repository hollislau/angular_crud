module.exports = function (app, angular) {
  require("./controllers")(app, angular);
  require("./directives")(app, angular);
};
