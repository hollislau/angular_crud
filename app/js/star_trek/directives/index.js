const basePath = "templates/star_trek/directives";

module.exports = function (app) {
  require("../../directives")
    .crudForm(app, "starTrekForm", basePath + "/star_trek_form.html");
  require("../../directives")
    .crudListItem(app, "starTrekListItem", basePath + "/star_trek_list_item.html");
};
