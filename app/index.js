'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

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

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // read https://github.com/SBoudrias/Inquirer.js to do more with options
  var prompts = [{
    name: 'nameOfAuthor',
    message: 'Whats your name?',
    default: ''
  },
  {
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
  }];

  this.prompt(prompts, function (props) {
    this.nameOfKata = props.nameOfKata;
    this.nameOfAuthor = props.nameOfAuthor;
    this.browser = props.browser;
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
  this.copy('jasmine.html', 'jasmine.html');
  this.copy('test/testSpec.js', 'test/testSpec.js');
  this.copy('test/phantom-polyfill.js', 'test/phantom-polyfill.js');

  this.template('karma.conf.js', 'karma.conf.js');
  this.template('_bower.json', 'bower.json');
};




