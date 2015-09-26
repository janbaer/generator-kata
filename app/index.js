'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var s = require('underscore.string');
var reader = require('html-wiring');

var generators = yeoman.generators;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('coffee');

    this.pkg = JSON.parse(reader.readFileAsString(path.join(__dirname, '../package.json')));
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
    }];

    if (!this.options.coffee) {
      var languages = {
          type: 'list',
          name: 'language',
          message: 'Which language do you want to use?',
          choices: [
          {
            name: 'JavaScript',
            value: 'javascript'
          },
          {
            name: 'CoffeScript',
            value: 'coffee'
          },
          {
            name: 'Typescript',
            value: 'typescript'
          }]
        };
      prompts.push(languages);
    }

    this.prompt(prompts, function (props) {
      this.nameOfKata = props.nameOfKata;
      this.browser = props.browser;
      this.reporters = props.reporters;
      this.dependencies = props.installDependencies;
      this.babel = this.options.babel || props.language === 'javascript';
      this.coffee = this.options.coffee || props.language === 'coffee';
      this.typescript = this.options.typescript || props.language === 'typescript';

      done();
    }.bind(this));
  },

  resolveFileExt: function (babel, coffee, typescript) {
    if (babel) {
      return 'js';
    }

    if (coffee) {
      return 'coffee';
    }

    if (typescript) {
      return 'ts';
    }
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
      ['jasmine-aliases.js', 'jasmine-aliases.js'],
    ].forEach(resolvedCopy);

    var fileExt = this.resolveFileExt(this.babel, this.coffee, this.typescript);

    [
      ['src/kata.spec.' + fileExt, 'src/' + s.slugify(this.nameOfKata) + '.spec.' + fileExt],
      ['src/kata.' + fileExt, 'src/' + s.slugify(this.nameOfKata) + '.' + fileExt]
    ].forEach(resolvedCopy);

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: s.slugify(this.nameOfKata),
        browser: this.browser,
        coffee: this.coffee,
        typescript: this.typescript,
        wantsGrowl: this.reporters.indexOf('growl') !== -1
      });

    this.fs.copyTpl(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js'),
      {
        babel: this.babel,
        coffee: this.coffee,
        typescript: this.typescript,
        reporters: this.reporters
      });

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        name: s.slugify(this.nameOfKata)
      });
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
