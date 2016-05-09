'use strict'

const mainBowerFiles = require('main-bower-files')
const filter = require('gulp-filter')
const notify = require('gulp-notify')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')

module.exports = function (gulp, config) {
  gulp.task('bower:js', () => {
    if (!config.production) {
      let concat = require('gulp-concat-sourcemap')
    }

    return gulp.src(mainBowerFiles())
      .pipe(filter('**/*.js'))
      .pipe(concat(config.js.vendorOutputFile, {sourcesContent: true}))
      .pipe(gulpIf(config.production, uglify()))
      .pipe(gulp.dest(config.js.outputFolder))
      .pipe(notify({
        title: 'Bower JS',
        subtitle: 'Javascript Bower Files Imported!',
        icon: config.notifLogo,
        message: ' '
      }))
  })

  gulp.task('bower:css', () => {
    return gulp.src(mainBowerFiles())
      .pipe(filter('**/*.css'))
      .pipe(concat(config.css.vendorOutputFile))
      .pipe(gulpIf(config.production, cssnano({safe: true})))
      .pipe(gulp.dest(config.css.outputFolder || config.css.outputFolder))
      .pipe(notify({
        title: 'Bower CSS',
        subtitle: 'CSS Bower Files Imported!',
        icon: config.notifLogo,
        message: ' '
      }))
  })

  return gulp
}
