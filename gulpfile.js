require('app-module-path').addPath('./config/helpers');
require('app-module-path').addPath('./config');

var PATHS = require('PATHS');

var $ = require('gulp-load-plugins')();

var argv = require('yargs').argv;
var gulp = require('gulp');
var browser = require('browser-sync');
var HubRegistry = require('gulp-hub');

var hub = new HubRegistry(['./tasks/**/*.js']);
gulp.registry(hub);

var args = {};

// Primary Gulp Task - Hooks to Browsersync for watching and reloading changes
gulp.task('default', gulp.series('build', 'server', 'watch'))

// Build the "dist" folder by running all of the above tasks
gulp.task('build', gulp.series('clean', gulp.parallel('pages', 'sass', 'javascript', 'images', 'copy')));

// Build the site, run the server, and watch for file changes
gulp.task('watch', function() {
    gulp.watch(['./src/{layouts,pages,partials}/**/*.{html,hbs}'], ['pages:reset']);
    gulp.watch(['./src/assets/scss/**/*.scss'], ['sass', browser.reload]);
    gulp.watch(['./src/assets/js/**/*.js'], ['javascript', browser.reload]);
    gulp.watch(['./src/data/**/*.yml'], ['pages:reset']);
    gulp.watch([PATHS.images], ['images', browser.reload]);
    gulp.watch([PATHS.assets], ['clean', 'copy', browser.reload]);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', function() {
    browser.init({
      server: {
          baseDir: PATHS.dest.root,
          port: PATHS.port
      }
    });
});