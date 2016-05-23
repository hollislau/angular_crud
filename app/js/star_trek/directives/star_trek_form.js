module.exports = function (app) {
  app.directive("starTrekForm", () => {
    return {
      restrict: "EAC",
      templateUrl: "templates/star_trek/directives/star_trek_form.html",
      require: "^ngController",
      replace: true,
      transclude: true,
      scope: {
        stchar: "=",
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
