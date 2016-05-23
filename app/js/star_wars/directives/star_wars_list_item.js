module.exports = function (app) {
  app.directive("starWarsListItem", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/star_wars/directives/star_wars_list_item.html",
      require: "^ngController",
      replace: true,
      transclude: true,
      scope: {
        char: "="
      },
      link: function (scope, element, attrs, controller) {
        scope.edit = controller.editChar;
        scope.remove = controller.removeChar;
      }
    };
  });
};
