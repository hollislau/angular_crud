const gulp = require("gulp");
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const webpack = require("webpack-stream");
const nodemon = require("gulp-nodemon");
const livereload = require("gulp-livereload");
const mongoose = require("mongoose");
const fs = require("fs");
const cp = require("child_process");
const KarmaServer = require("karma").Server;
const protractor = require("gulp-protractor").protractor;
const webdriverUpdate = require("gulp-protractor").webdriver_update;
const mongoDbUri = "mongodb://localhost/scifi_client_test";

var lintClientFiles = ["app/**/*.js", "test/integration/**/*.js"];
var lintServerFiles = ["gulpfile.js", "index.js", "server.js"];
var staticFiles = ["app/**/*.html"];
var protractorFiles = ["test/integration/*_spec.js"];
var children = [];
var flagIndex = process.argv.indexOf("--apipath");
var apiServerPath = flagIndex >= 2 ? process.argv[flagIndex + 1] : false;
var protractorTask = apiServerPath ? "protractor:test" : "protractorError";

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
  .pipe(gulp.dest("build/js"))
  .pipe(livereload());
});

gulp.task("sass:dev", () => {
  return gulp.src("app/sass/main.scss")
    .pipe(maps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("build/css"))
    .pipe(livereload());
});

gulp.task("static:dev", () => {
  return gulp.src(staticFiles)
    .pipe(gulp.dest("build"))
    .pipe(livereload());
});

gulp.task("webpack:test", () => {
  return gulp.src("test/unit/test_entry.js")
    .pipe(webpack({
      devtool: "source-map",
      output: {
        filename: "main.js"
      }
    }))
    .pipe(gulp.dest("test"));
});

gulp.task("karma:test", ["webpack:test"], (done) => {
  new KarmaServer({
    configFile: __dirname + "/test/unit/karma.config.js"
  }, done).start();
});

gulp.task("protractorError", () => {
  process.stderr.write(
    "Protractor: Provide command line arguments for API server path '--apipath [path]'\n"
  );
});

gulp.task("webdriverUpdate", webdriverUpdate);

gulp.task("mongoDb:test", (done) => {
  fs.access("db", fs.W_OK, (err) => {
    if (err) fs.mkdirSync("db");

    children.push(cp.spawn("mongod", ["--dbpath=./db"]));
    setTimeout(done, 1000);
  });
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
  children.push(cp.fork(apiServerPath, [], {
    env: { MONGODB_URI: mongoDbUri }
  }));
  setTimeout(done, 1000);
});

gulp.task("protractor:test", ["build:dev", "webdriverUpdate", "servers:test"], () => {
  return gulp.src(protractorFiles)
    .pipe(protractor({
      configFile: "test/integration/protractor.config.js"
    }))
    .on("end", () => {
      killChildProcesses();
    })
    .on("error", () => {
      killChildProcesses();
    });
});

gulp.task("nodemon", () => {
  nodemon({
    script: "server.js",
    watch: ["server.js"]
  })
  .on("restart", () => {
    process.stdout.write("Server restarted!\n");
  });
});

gulp.task("watch", ["nodemon"], () => {
  livereload.listen();
  gulp.watch("app/**/*.js", ["webpack:dev"]);
  gulp.watch("app/**/*.scss", ["sass:dev"]);
  gulp.watch("app/**/*.html", ["static:dev"]);
});

gulp.task("lint", ["lintClient", "lintServer"]);
gulp.task("build:dev", ["webpack:dev", "sass:dev", "static:dev"]);
gulp.task("test", ["karma:test", protractorTask]);
gulp.task("default", ["lint", "test"]);
