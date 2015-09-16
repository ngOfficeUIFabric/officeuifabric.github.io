'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * Launch static webserver and browser viewing the page and attach
 * BrowserSync, watching for all HTML, CSS & JS files for changes to 
 * autoreload the launched brwoser.
 */
gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: "./",
      middleware:[
        // when running locally, return an empty azure app insights file
        function (req, res, next){
          if (req.originalUrl === '/js/azure-app-insights.js'){
            console.log('returning empty Azure Application Insights JS to local server');
            req.url = '/js/azure-app-insights.local.js';
          }
          return next();
        }
      ]
    }
  });
  
  // watch for all HTML, CSS & JS changes and auto reload
  gulp.watch(['**/*.html','**/*.css','**/*.js'])
      .on('change', browserSync.reload);
});