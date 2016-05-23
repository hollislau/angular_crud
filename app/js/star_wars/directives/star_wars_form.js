module.exports = function (app) {
  app.directive("starWarsForm", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/star_wars/directives/star_wars_form.html",
      require: "^ngController",
      replace: true,
      transclude: true,
      scope: {
        swchar: "=",
        buttonText: "@",
        crudAction: "@"
      },
      link: function (scope, element, attrs, controller) {
        var actions = {
          create: controller.createChar,
          update: controller.updateChar
        };

        scope.save = actions[scope.crudAction];
      }
    };
  });
};
