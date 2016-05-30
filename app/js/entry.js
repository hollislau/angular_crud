const angular = require("angular");
const scifiApp = angular.module("scifiApp", []);

require("./services")(scifiApp);
require("./star_trek")(scifiApp);
require("./star_wars")(scifiApp);
require("./battle")(scifiApp);
