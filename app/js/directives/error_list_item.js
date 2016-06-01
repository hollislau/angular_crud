module.exports = function (app) {
  app.directive("errorListItem", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/directives/error_list_item.html",
      require: "^ngController",
      replace: true,
      scope: {
        error: "="
      },
      link: function (scope, element, attrs, controller) {
        scope.remove = controller.removeErr;
      }
    };
  });
};
