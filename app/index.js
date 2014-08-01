'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var slug = require('slug');

function camelize(string) {
  return string.replace(/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  }).replace(/\s+/g, '');
}

var MobileangularuiGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to Mobile Angular Ui Boilerplate generator!'));

    var prompts = [{
          name: 'appName',
          message: 'What is your app\'s name ?',
          default: 'My App'
        }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appSlug = slug(props.appName).toLowerCase();
      this.appModule = camelize(props.appName);
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/js');
    this.mkdir('src/js/directives');
    this.mkdir('src/js/services');
    this.mkdir('src/js/controllers');
    this.mkdir('src/less');
    this.mkdir('src/templates');
    this.mkdir('src/html');
    this.mkdir('src/images');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_index.html', 'src/html/index.html');
    this.copy('_sidebar.html', 'src/templates/sidebar.html');
    this.copy('_home.html', 'src/templates/home.html');
    this.copy('_gitignore', '.gitignore');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_main_controller.js', 'src/js/controllers/main_controller.js');
    this.copy('_app.js', 'src/js/app.js');
    this.copy('_config.js', 'config.js');
    this.write('src/less/variables.less', '');
    this.write('src/less/mixins.less', '');
    this.copy('_app.less', 'src/less/app.less');
    this.copy('_responsive.less', 'src/less/responsive.less');
  }
});

module.exports = MobileangularuiGenerator;
