module.exports = function (app, name, path) {
  app.directive(name, () => {
    return {
      restrict: "EAC",
      templateUrl: path,
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
