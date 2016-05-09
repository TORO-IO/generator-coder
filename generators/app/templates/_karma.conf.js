module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    // PhantomJS doesn't support ES6 yet
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },
    files: [
      // Babel Polyfill: Fixes PhantomJS complaints
      'node_modules/babel-polyfill/dist/polyfill.js',

      // Non-Angular Dependencies
      'bower_components/qs/dist/qs.js',
      'bower_components/pouchdb/dist/pouchdb.js',

      // Angular Dependencies
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-pouchdb/angular-pouchdb.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

      'src/app-ui/coder-modules/coder.modules.js',
      'src/app-ui/coder-modules/**/*.js',

      'src/app-ui/coder-{app,codebox,pageflow,widgetbox}/*.js',
      'test/unit/coder-{app,codebox,modules,pageflow,widgetbox}/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'src/app/**/*.js': ['babel'],
      'test/unit/**/*.js': ['babel']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-babel-preprocessor',
      'karma-phantomjs-launcher'
    ],
    singleRun: true,
    concurrency: Infinity
  })
}
