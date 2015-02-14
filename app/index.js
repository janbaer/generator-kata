'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var KataGenerator = module.exports = function KataGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KataGenerator, yeoman.generators.Base);

KataGenerator.prototype.askFor = function () {
  var cb = this.async();

  // read https://github.com/SBoudrias/Inquirer.js to do more with options
  var prompts = [{
    name: 'nameOfKata',
    message: 'Whats the name of your kata?',
    default: ''
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
    }]
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

  this.prompt(prompts, function (props) {
    this.nameOfKata = props.nameOfKata;
    this.browser = props.browser;
    this.reporters = props.reporters;
    cb();
  }.bind(this));
};

KataGenerator.prototype.projectfiles = function () {
  this.mkdir('src');
  this.mkdir('test');

  this.copy('.editorconfig', '.editorconfig');
  this.copy('.jshintrc', '.jshintrc');
  this.copy('.bowerrc', '.bowerrc');
  this.copy('_gitignore', '.gitignore');
  this.copy('_package.json', 'package.json');
  this.copy('test/phantom-polyfill.js', 'test/phantom-polyfill.js');
  this.copy('test/jasmine-aliases.js', 'test/jasmine-aliases.js');
  this.copy('test/test.js', 'test/' + _.slugify(this.nameOfKata) + '.spec.js');
  this.copy('src/src.js', 'src/' + _.slugify(this.nameOfKata) + '.js');

  this.template('karma.conf.js', 'karma.conf.js');
  this.template('_bower.json', 'bower.json');
};




