'use strict'

const standard = require('gulp-standard')

module.exports = function (gulp, config) {
  gulp.task('standard', () => {
    return gulp.src([config.js.angularSrc + '**/*.*.js'])
      .pipe(standard())
      .pipe(standard.reporter('default', {
        breakOnError: true
      }))
  })

  return gulp
}
