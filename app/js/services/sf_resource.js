module.exports = function (app) {
  app.factory("sfResource", ["$http", "sfHandleError", function ($http, sfError) {
    var Resource = function (resrcArr, errsArr, baseUrl, options) {
      this.resource = resrcArr;
      this.errors = errsArr;
      this.url = baseUrl;
      this.options = options || {};
      this.options.errMsgs = this.options.errMsgs || {};
    };

    Resource.prototype.getAll = function () {
      return $http.get(this.url)
        .then((res) => {
          this.resource.splice(0);
          for (var i = 0; i < res.data.length; i++) {
            this.resource.push(res.data[i]);
          }
        }, sfError(this.errors, this.options.errMsgs.getAll || "Unable to retrieve resource!"));
    };

    Resource.prototype.create = function (resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.resource.push(res.data);
        }, sfError(this.errors, this.options.errMsgs.create || "Unable to create resource!"));
    };

    Resource.prototype.update = function (resource) {
      return $http.put(this.url + "/" + resource._id, resource)
        .then(() => {
          return true;
        })
        .catch(sfError(this.errors, this.options.errMsgs.update || "Unable to update resource!"));
    };

    Resource.prototype.remove = function (resource) {
      return $http.delete(this.url + "/" + resource._id)
        .then(() => {
          this.resource.splice(this.resource.indexOf(resource), 1);
        }, sfError(this.errors, this.options.errMsgs.remove || "Unable to remove resource!"));
    };

    Resource.prototype.removeErr = function (error) {
      return this.errors.splice(this.errors.indexOf(error), 1);
    };

    return Resource;
  }]);
};
