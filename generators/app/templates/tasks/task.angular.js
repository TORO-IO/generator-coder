'use strict'

const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')
const ngAnnotate = require('gulp-ng-annotate')
const notify = require('gulp-notify')
const gulpif = require('gulp-if')
const webpack = require('webpack-stream')

module.exports = function (gulp, config) {
  gulp.task('angular', () => {
    return gulp.src([
      config.js.angularSrc + 'index.js',
      config.js.angularSrc + '**/*.*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(webpack(config.webpack))
    .pipe(ngAnnotate())
    .pipe(gulpif(config.production, uglify()))
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(config.js.outputFolder))
    .pipe(notify({
      title: 'Angular Files',
      subtitle: 'Angular Files Imported!',
      icon: config.notifLogo,
      message: ' '
    }))
  })

  return gulp
}
