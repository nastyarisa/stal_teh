//npm i --save-dev gulp gulp-less gulp-plumber gulp-postcss gulp-posthtml posthtml-include autoprefixer browser-sync
//npm i --save-dev gulp-csso gulp-rename gulp-imagemin gulp-webp run-sequence del gulp-uglify pump gulp-pug

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var run = require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");
var pump = require('pump');
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('pug/*.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest("build"));
})

gulp.task("less", function() {
  gulp.src("less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("css"))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

gulp.task("webp", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("img"));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src("js/**/*.js"),
        uglify(),
        gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });
  gulp.watch("less/**/*.less", ["less"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/**/*.js", ["compress"]);
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});


gulp.task("build", function(done) {
  run(
    "clean",
    "pug",
    "copy",
    "less",
    "compress",
    done
  );
});