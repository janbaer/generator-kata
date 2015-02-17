'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var s = require('underscore.string');

var generators = yeoman.generators;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('coffee');

    this.on('end', function () {
      this.installDependencies({ skipInstall: !this.dependencies });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'nameOfKata',
      message: 'Whats the name of your kata?',
      default: 'kata'
    },
    {
      type: 'list',
      name: 'browser',
      message: 'Which browser do you want to use for debugging?',
      choices: [{
        name: 'Chrome',
        value: 'Chrome'
      }, {
        name: 'ChromeCanary',
        value: 'ChromeCanary'
      }],
      default: 'Chrome'
    },
    {
      type: 'checkbox',
      name: 'reporters',
      message: 'Which reporters do you want to use for the test output?',
      choices: [{
        name: 'Spec',
        value: 'spec',
        checked: true
      }, {
        name: 'Growl (Mac only)',
        value: 'growl'
      }],
      default: ['spec']
    },
    {
      type: 'list',
      name: 'installDependencies',
      message: 'Install the required modules (npm and bower) automatically?',
      choices: [{
        name: 'Yes',
        value: true
      }, {
        name: 'No',
        value: false
      }],
      default: false
    }
    ];

    this.prompt(prompts, function (props) {
      this.nameOfKata = props.nameOfKata;
      this.browser = props.browser;
      this.reporters = props.reporters;
      this.dependencies = props.installDependencies;
      done();
    }.bind(this));
  },

  writing: function () {
    var resolvedCopy = (function (pair) {
      var src = pair[0];
      var dest = pair[1];

      this.fs.copy(
        this.templatePath(src),
        this.destinationPath(dest));
    }).bind(this);

    [
      ['.editorconfig', '.editorconfig'],
      ['.jshintrc', '.jshintrc'],
      ['.bowerrc', '.bowerrc'],
      ['_gitignore', '.gitignore'],
      ['test/phantom-polyfill.js', 'test/phantom-polyfill.js'],
      ['test/jasmine-aliases.js', 'test/jasmine-aliases.js'],
    ].forEach(resolvedCopy);

    if (this.options.coffee) {
      [
        ['test/test.coffee', 'test/' + s.slugify(this.nameOfKata) + '.spec.coffee'],
        ['src/src.coffee', 'src/' + s.slugify(this.nameOfKata) + '.coffee']
      ].forEach(resolvedCopy);
    } else {
      [
        ['test/test.js', 'test/' + s.slugify(this.nameOfKata) + '.spec.js'],
        ['src/src.js', 'src/' + s.slugify(this.nameOfKata) + '.js']
      ].forEach(resolvedCopy);
    }

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: s.slugify(this.nameOfKata),
        browser: this.browser,
        wantsGrowl: this.reporters.indexOf('growl') !== -1
      });

    this.fs.copyTpl(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js'),
      this);

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {name: s.slugify(this.nameOfKata)});
  }
});
