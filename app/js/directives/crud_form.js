module.exports = function (app, name, path) {
  app.directive(name, () => {
    return {
      restrict: "EAC",
      templateUrl: path,
      require: "^ngController",
      replace: true,
      transclude: true,
      scope: {
        char: "=",
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
