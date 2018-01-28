// Delete the "dist" folder
// This happens every time a build starts
var PATHS = require('PATHS');


var gulp = require('gulp');
var rimraf = require('rimraf');

gulp.task('clean', function(done){
    rimraf(
      PATHS.dest.root, done
    );
});
