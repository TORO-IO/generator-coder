'use strict';

var yeoman  = require('yeoman-generator')
var chalk   = require('chalk')
var yosay   = require('yosay')
require('shelljs/global')

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments)
  },
  prompting: function () {
    var done    = this.async();
    var prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'What would you like to call this project',
        store: true,
        default: 'AngularJS Boilerplate'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your application, what does it do?',
        store: true,
        default: ''
      },
      {
        type: 'input',
        name: 'appversion',
        message: 'Version',
        store: true,
        default: '0.1.0'
      },
      {
        type: 'checkbox',
        name: 'ngversion',
        message: 'Which version of AngularJS to use',
        store: true,
        choices: [
          {value: '1.5.5', checked: true},
          {value: '1.4.10', checked: false}
        ]
      },
      {
        type: 'checkbox',
        name: 'ngmodules',
        message: 'Which modules would you like to include?',
        store: true,
        choices: [
          { value: "angular-animate",   name: "ngAnimate", checked: false},
          { value: "angular-cookies",   name: "ngCookies", checked: false},
          { value: "angular-resource",  name: "ngResource", checked: true},
          { value: "angular-route",     name: "ngRoute", checked: false},
          { value: "angular-sanitize",  name: "ngSanitize", checked: false},
          { value: "angular-ui-router", name: "ui.router", checked: true},
          { value: "angular-bootstrap", name: "ui.bootstrap", checked: true}
        ]
      },
      {
        type: 'checkbox',
        name: 'csspreprocessor',
        message: 'CSS Styling Tools',
        store: true,
        choices: [
          { value: 'bootstrap@3.3.6', name: 'Bootstrap v3.3.6', checked: false},
          { value: 'bootstrap@4.0.0-alpha.2', name: 'Bootstrap v4.0.0-alpha.2', checked: true},
          { value: 'bourbon@latest', name: 'Bourbon', checked: true}
        ]
      }
    ]

    this.log(yosay(
      'Welcome to the peachy ' + chalk.red('Pongstr Boilerplate') + ' generator!'
    ))

    this.prompt(prompts, function (props) {
      var hasMod  = function (mod) { return props.ngmodules.indexOf(mod) !== -1 }

      this.props        = props
      this.appModules   = []
      this.ngAnimate    = hasMod('angular-animate')
      this.ngCookies    = hasMod('angular-cookies')
      this.ngResource   = hasMod('angular-resource')
      this.ngRoute      = hasMod('angular-route')
      this.ngSanitize   = hasMod('angular-sanitize')
      this.uiRouter     = hasMod('angular-ui-router')
      this.uiBootstrap  = hasMod('angular-bootstrap')


      this.ngAnimate    && this.appModules.push('ngAnimate');
      this.ngCookies    && this.appModules.push('ngCookies');
      this.ngResource   && this.appModules.push('ngResource');
      this.ngRoute      && this.appModules.push('ngRoute');
      this.ngSanitize   && this.appModules.push('ngSanitize');
      this.uiRouter     && this.appModules.push('ui.router');
      this.uiBootstrap  && this.appModules.push('ui.bootstrap');

      this.config.set('ngversion', props.ngversion)
      this.config.set('ngmodules', props.ngmodules)
      this.config.set('csspreprocessor', props.csspreprocessor)
      this.config.save()
      done()
    }.bind(this))

  },

  writing: function () {
    var stylesheet = 'src/scss/' + this.props.appname + '.scss'

    this.template('_bower.json', 'bower.json', {
      appname: this.props.appname,
      description: this.props.description,
      appversion: this.props.appversion,
      ngversion: this.props.ngversion
    })

    this.template('_package.json', 'package.json', {
      appname: this.props.appname,
      description: this.props.description,
      appversion: this.props.appversion
    })


    this.fs.copy(this.templatePath('_.babelrc'), this.destinationPath('.babelrc'))
    this.fs.copy(this.templatePath('_.editorconfig'), this.destinationPath('.editorconfig'))
    this.fs.copy(this.templatePath('_.eslintrc'), this.destinationPath('.eslintrc'))
    this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'))
    this.fs.copy(this.templatePath('tasks/*.js'), this.destinationPath('src/tasks'))

    this.fs.copy(this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js'))
    this.fs.copy(this.templatePath('_karma.conf.js'), this.destinationPath('karma.conf.js'))
    this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'))
    this.fs.copy(this.templatePath('app/.gitkeep'), this.destinationPath('app/.gitkeep'))
    this.fs.copy(this.templatePath('scss/*.scss'), this.destinationPath('src/scss'))

    this.template('app/_modules', 'src/app/modules.js')
    this.fs.copy(
      this.templatePath('app/**/*.js'),
      this.destinationPath('src/app')
    )
  },

  install: function () {
    this.bowerInstall(this.props.ngmodules, {save: true})
    this.npmInstall(this.props.csspreprocessor, {saveDev: true}, function () {
      exec('ln -sf ../../node_modules/bourbon/app/assets/stylesheets src/scss/bourbon')
      exec('ln -sf ../../node_modules/bootstrap/scss src/scss/bootstrap')
    })
    this.installDependencies({
      bower: this.options['skip-install'] || true,
      npm: this.options['skip-install'] || true
    })
  }
});
