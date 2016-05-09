'use strict'

const Server = require('karma').Server

module.exports = function (gulp, config) {
  gulp.task('tests', (done) => {
    new Server({
      configFile: process.cwd() + '/karma.conf.js',
      singleRun: true
    }, done)
    .start()
  })

  return gulp
}
