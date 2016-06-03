module.exports = function (app) {
  require("./sf_counter")(app);
  require("./sf_handle_error")(app);
  require("./sf_resource")(app);
};
