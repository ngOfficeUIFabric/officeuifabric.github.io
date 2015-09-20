'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync').create();
var del = require('del');
var config = require('./gulp.config.js');

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * Launch static webserver and browser viewing the page and attach
 * BrowserSync, watching for all HTML, CSS & JS files for changes to 
 * autoreload the launched brwoser.
 */
gulp.task('serve-dev', function(done){
  browserSync.init({
    server:{
      baseDir: config.root,
      middleware:[
        // when running locally, return an empty azure app insights file
        function (req, res, next){
          if (req.originalUrl === config.azureAppInsights.prodJs){
            console.log('returning empty Azure Application Insights JS to local server');
            req.url = config.azureAppInsights.localDevJs;
          }
          return next();
        }
      ]
    }
  });

  done();
});

/**
 * Process SCSS to generate CSS & minimfied CSS. 
 */
gulp.task('styles', function(done){
  gulp.src(config.scss.fullPath)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest(config.css.path))
    .pipe($.minifyCss())
    .pipe($.rename(config.css.optimized))
    .pipe(gulp.dest(config.css.path));
    
  done();
});

/**
 * Delete all generated CSS.
 */
gulp.task('clean-styles', function(done){
    var files = [
      config.css.uncompressedFullPath,
      config.css.optimizedFullPath
    ];
    del(files, done);
});


gulp.task('browserSyncReload', ['styles'], function(done){
  browserSync.reload();
  done();
});

gulp.task('serve', ['styles', 'serve-dev'], function(){
  gulp.watch([config.allHtml, config.allJs, config.scss.allScss], ['browserSyncReload'])
      .on('change', changeEvent);
});

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/* +-+-+-+-+-+-+-+-+-+- UTILITIES -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/)/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

