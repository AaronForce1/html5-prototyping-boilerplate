// Copy page templates into finished HTML files
var PATHS = require('PATHS');

var gulp = require('gulp');
var panini = require('panini');
var browser = require('browser-sync');

gulp.task('pages', function(cb) {
    gulp.src('./src/pages/**/*.{html,hbs,handlebars}')
      .pipe(panini({
        root: './src/pages/',
        layouts: './src/layouts/',
        // pageLayouts: {
        //   // All pages inside src/pages/blog will use the blog.html layout
        //   'blog': 'blog'
        // },
        partials: './src/partials/',
        data: './src/data/',
        helpers: './src/helpers/'
      }))
      .pipe(gulp.dest(PATHS.dest.root));
      cb();
});

// Gulp Rebuilding Partials!
gulp.task('refresh', function(cb){
    panini.refresh();
    cb();
});

gulp.task('reset', gulp.series('pages'), function(){
    setTimeout(function(){
      browser.reload();
    }, 2000);
});

// WRAP GULP FUNCTIONS TOGETHER IN QUEUE
gulp.task('pages:reset', gulp.series('refresh', 'pages', 'reset'));