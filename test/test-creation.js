/* global describe, beforeEach, it */

'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var exec = require('child_process').exec;
var assert = require('assert');

describe('mobileangularui generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('mobileangularui:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      'bower.json',
      'src/html/index.html',
      'src/templates/sidebar.html',
      'src/templates/home.html',
      '.gitignore',
      'gulpfile.js',
      'src/js/controllers/main_controller.js',
      'src/js/app.js',
      'config.js',
      'src/less/variables.less',
      'src/less/mixins.less',
      'src/less/app.less',
      'src/less/responsive.less'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'Foo Bar'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });


  it('builds without errors', function (done) {
    this.timeout(60 * 1000 * 15);

    helpers.mockPrompt(this.app, {
      'appName': 'Foo Bar'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      console.log('Running npm install ...');
      exec('npm install > /dev/null', {cwd: path.join(__dirname, 'temp')}, function(err1){
        assert.ok(!err1, 'npm install failed. Reason ' + err1);
        console.log('Running bower install ...');
        exec('bower install > /dev/null', {cwd: path.join(__dirname, 'temp')}, function(err2){
          assert.ok(!err2, 'Bower install failed. Reason ' + err2);
          console.log('Running gulp build ...');
          exec('gulp build > /dev/null', {cwd: path.join(__dirname, 'temp')}, function(err3){
            assert.ok(!err3, 'Gulp build failed. Reason ' + err3);
            done();
          });
        });
      });
    });
  });

});
