const basePath = "templates/star_wars/directives";

module.exports = function (app) {
  require("../../directives")
    .crudForm(app, "starWarsForm", basePath + "/star_wars_form.html");
  require("../../directives")
    .crudListItem(app, "starWarsListItem", basePath + "/star_wars_list_item.html");
};
