'use strict';

const gulp    = require('gulp')
const util    = require('gulp-util')

const config  = module.exports = {
  production: util.env.production,
  webpack: require('./webpack.config'),
  notiflogo: 'static/assets/img/logo.png',
  js: {
    angularSrc:       './src/app',
    outputFolder:     './app/static/scripts',
    vendorOutputFile: 'vendor.js',
    ngHtmlOutputFile: 'views.js'
  },
  css: {
    outputFolder: '/app/static/assets/css',
    vendorOutputFile: 'app.css'
  },
  sass: {
    folder: '../../src/app'
  }
}


require('./src/tasks/task.angular')(gulp, config)
require('./src/tasks/task.bower')(gulp, config)
require('./src/tasks/task.nghtml')(gulp, config)
require('./src/tasks/task.standard')(gulp, config)
require('./src/tasks/task.tests')(gulp, config)

gulp.task('default', [
  'angular',
  'bower:js',
  'bower:css',
  'ngHtml2Js',
  'tests'
])

gulp.task('watch', [
  'angular',
  'bower:js',
  'bower:css',
  'ngHtml2Js',
  'tests'
], function () {
  return gulp.watch(config.js.angularSrc + '**/*.*.{html,js}', [
    'angular',
    'ngHtml2Js'
  ])
})
