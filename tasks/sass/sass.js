// Compile Sass into CSS
// In production, the CSS is compressed
var join = require("join");
var PATHS = require('PATHS');

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var sassGlob = require('gulp-sass-glob');
var cssnano = require('gulp-cssnano');

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

gulp.task('sass', function(){
  var minifycss = $.if(argv.production, cssnano());

  return gulp.src('./src/assets/scss/app.scss')
    .pipe(sassGlob())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
       browsers: COMPATIBILITY
    }))
    //.pipe(uncss) Causing issues when in production
    .pipe(minifycss)
    .pipe(gulpif(!argv.production, $.sourcemaps.write()))
    .pipe(gulp.dest(
        PATHS.dest.root
    ))

});
