// Copy files out of the assets folder
// This task skips over the "js", "scss", "img" folders, which are parsed separately
var PATHS = require('PATHS');
var join = require('join');

var gulp = require('gulp');

// Copy images to the "dist" folder
gulp.task('copy', function(done){
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(join([PATHS.dest.root, '/assets'])));
});