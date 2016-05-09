'use strict'

const gulp = require('gulp')
const ngHtml2Js = require('gulp-ng-html2js')
const minifyHtml = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')
const _ = require('underscore')
const notify = require('gulp-notify')

module.exports = function (gulp, config) {
  gulp.task('ngHtml2Js', () => {
    let options = _.extend({
      moduleName: 'app.partials',
      prefix: './views'
    })

    return gulp.src(config.js.angularSrc + '**/*.html')
      .pipe(gulpIf(config.production, minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      })))
      .pipe(ngHtml2Js(options))
      .pipe(concat(config.js.ngHtmlOutputFile))
      .pipe(gulpIf(config.production, uglify()))
      .pipe(gulp.dest(config.js.outputFolder))
      .pipe(notify({
        title: 'Angular HTML to JS Files',
        subtitle: 'Angular HTML Files Imported!',
        icon: config.notifLogo,
        message: ' '
      }))
  })

  return gulp
}
