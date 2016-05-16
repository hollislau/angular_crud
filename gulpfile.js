const gulp = require("gulp");
const eslint = require("gulp-eslint");
const webpack = require("webpack-stream");
const nodemon = require("gulp-nodemon");
const mongoose = require("mongoose");
const cp = require("child_process");
const protractor = require("gulp-protractor").protractor;
const webdriverUpdate = require("gulp-protractor").webdriver_update;
const mongoDbUri = "mongodb://localhost/scifi_client_test";

var lintClientFiles = ["app/**/*.js", "test/integration/**/*.js"];
var lintServerFiles = ["gulpfile.js", "index.js", "server.js"];
var staticFiles = ["app/**/*.html", "app/**/*.css"];
var protractorFiles = ["test/integration/*_spec.js"];
var children = [];

function killChildProcesses() {
  children.forEach((child) => {
    child.kill("SIGTERM");
  });
}

gulp.task("lintClient", () => {
  return gulp.src(lintClientFiles)
  .pipe(eslint("app/.eslintrc.json"))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task("lintServer", () => {
  return gulp.src(lintServerFiles)
    .pipe(eslint(".eslintrc.json"))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("webpack:dev", () => {
  return gulp.src("app/js/entry.js")
    .pipe(webpack({
      devtool: "source-map",
      output: {
        filename: "main.js"
      }
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("static:dev", () => {
  return gulp.src(staticFiles)
    .pipe(gulp.dest("build"));
});

gulp.task("webdriverUpdate", webdriverUpdate);

gulp.task("mongoDb:test", (done) => {
  children.push(cp.spawn("mongod"));
  setTimeout(done, 1000);
});

gulp.task("dropTestDb", ["mongoDb:test"], (done) => {
  mongoose.connect(mongoDbUri, () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
});

gulp.task("servers:test", ["dropTestDb"], (done) => {
  children.push(cp.fork("server"));
  children.push(cp.fork("../../week_3/rest_api/hollis_lau/server", [], {
    env: { MONGODB_URI: mongoDbUri }
  }));
  setTimeout(done, 1000);
});

gulp.task("protractor:test", ["build:dev", "webdriverUpdate", "servers:test"], () => {
  return gulp.src(protractorFiles)
    .pipe(protractor({
      configFile: "test/integration/config.js"
    }))
    .on("end", () => {
      killChildProcesses();
    })
    .on("error", () => {
      killChildProcesses();
    });
});

gulp.task("develop", () => {
  nodemon({
    script: "server.js",
    ext: "js html css",
    ignore: ["build/**/*", "node_modules/**/*"]
  })
  .on("start", ["lint", "test"])
  .on("change", ["lint", "test"])
  .on("restart", () => {
    process.stdout.write("Server restarted!\n");
  });
});

gulp.task("lint", ["lintClient", "lintServer"]);
gulp.task("build:dev", ["webpack:dev", "static:dev"]);
gulp.task("test", ["protractor:test"]);
gulp.task("default", ["lint", "test"]);
