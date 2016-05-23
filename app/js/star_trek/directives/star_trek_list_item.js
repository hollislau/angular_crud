module.exports = function (app) {
  app.directive("starTrekListItem", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/star_trek/directives/star-trek-list-item.html",
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
