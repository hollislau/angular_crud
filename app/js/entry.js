const angular = require("angular");
const scifiApp = angular.module("scifiApp", []);

require("./star_trek")(scifiApp, angular);
require("./star_wars")(scifiApp, angular);
require("./battle")(scifiApp, angular);
