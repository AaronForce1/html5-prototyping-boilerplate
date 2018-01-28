// Combine JavaScript into one file
// In production, the file is minified
var join = require("join");
var PATHS = require('PATHS');

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('javascript', function () {
    var uglify = gulpif(argv.production, $.uglify()
      .on('error', function (e) {
          console.log(e);
      }));

    return gulp.src(PATHS.javascript)
      .pipe($.sourcemaps.init())
      .pipe($.concat('app.js'))
      //.pipe(modernizr())
      .pipe(uglify)
      .pipe(gulpif(!argv.production, $.sourcemaps.write()))
      .pipe(gulp.dest(
        PATHS.dest.root
      ))
});
