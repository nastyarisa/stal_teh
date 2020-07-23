//npm i --save-dev gulp gulp-less gulp-plumber gulp-postcss gulp-posthtml posthtml-include autoprefixer browser-sync
//npm i --save-dev gulp-csso gulp-rename gulp-imagemin gulp-webp run-sequence del gulp-uglify pump gulp-pug

const {gulp, src, dest, parallel, series, watch } = require('gulp');
// const gulp = require("gulp");
const babel = require('gulp-babel');
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const run = require("run-sequence");
const del = require("del");
const uglify = require('gulp-uglifyes');
const pug = require('gulp-pug');
// var uglifyes = require('uglify-es');
// var composer = require("gulp-uglify/composer");
// var pump = require('pump');

// var minify = composer(uglifyes, console);

function html() {
  return src('pug/**/*.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(dest("build"));
}

function css() {
  return src("less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(dest("css"))
  .pipe(dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(dest("build/css"))
  .pipe(browsersync.stream());
};

function images() {
  return src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(dest("img"));
};

function webP() {
  return src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(dest("img"));
};

function compress() {
  return src('js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(dest('build/js'));
}

// function browserSync(done) {
//   browsersync.init({
//     server: "build/",
//     port: 3000
//   });
//   done();
// }

// BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }

function serve() {
  // server.init({
  //   server: "build/"
  // });
  browsersync.init({
    baseDir: "./",
    server: "build/",
    port: 3000
  });
  watch("less/**/*.less", css);
  watch("pug/**/*.pug").on('change', series(html, browsersync.reload));
  watch("js/**/*.js").on('change', series(compress, browsersync.reload));
};


function copy() {
  return src([
    "fonts/**/*.{ttf}",
    "img/**"
  ], {
    base: "."
  })
  .pipe(dest("build"));
};


function clean() {
  return del("build");
};


// const serve = parallel(watchFiles, browserSync);
const build = series(clean, html, copy, css, compress);

exports.clean = clean;
exports.copy = copy;
exports.compress = compress;
exports.webP = webP;
exports.images = images;
exports.css = css;
exports.html = html;
exports.serve = serve;
exports.default = build;