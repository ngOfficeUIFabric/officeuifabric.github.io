'use strict';

module.exports = (function(){
  var cssPath = './css';
  var sourcePath = './';

  var config = {
    allHtml: './**/*.html',
    allJs: './**/*.js',
    azureAppInsights:{
      prodJs: '/js/azure-app-insights.js',
      localDevJs: '/js/azure-app-insights.local.js'
    },
    css: {
      path: cssPath,
      uncompressed: 'styles.css',
      uncompressedFullPath: cssPath + 'styles.css',
      optimized: 'styles.min.css',
      optimizedFullPath: cssPath + 'styles.min.css'
    },
    root: sourcePath,
    scss: {
      allScss: cssPath +'/*.scss',
      file: '/styles.scss',
      fullPath: cssPath + '/styles.scss'
    }
  };

  return config;
})();