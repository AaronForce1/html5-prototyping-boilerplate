var PATHS = require('PATHS');

var $ = require('gulp-load-plugins')();

var gulp = require('gulp');
var join = require('join');
var argv = require('yargs').argv;
var imagemin = require('gulp-imagemin');

// Check for --production flag
var isProduction = !!(argv.production);

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imgminify = $.if(isProduction, imagemin.jpegtran({
    progressive: true
  }));

  return gulp.src(PATHS.images)
    .pipe(imgminify)
    .pipe(gulp.dest(
      join([PATHS.dest.root, 'assets/img']))
    );
});
