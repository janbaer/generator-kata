/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var yo = require('yeoman-generator');
var t = require('lodash.template');

var helpers = yo.test;
var assert = yo.assert;

var appDir = path.join(__dirname, '../app');
var tempDir = path.join(__dirname, '../temp');

describe('kata:app', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

  describe('when generating with default prompts', function () {
    beforeEach(function (done) {
      helpers
        .run(appDir)
        .inDir(tempDir)
        .withPrompt({
          nameOfKata: 'test',
          browser: 'Chrome',
          reporters: ['spec'],
          installDependencies: false })
        .on('end', done);
    });

    [
      '.editorconfig',
      '.jshintrc',
      '.bowerrc',
      '.gitignore',
      'package.json',
      'bower.json',
      'karma.conf.js'
    ]
    .forEach(function (f) {
      it(t('creates <%= file %>')({file:f}), function () {
        assert.file(f);
      });
    });
  });

  describe('using no option', function () {
    beforeEach(function (done) {
      helpers
        .run(appDir)
        .inDir(tempDir)
        .on('end', done);
    });

    [
      'src/kata.js',
      'test/kata.spec.js'
    ]
    .forEach(function (f) {
      it(t('creates <%= file %>')({file:f}), function () {
        assert.file(f);
      });
    });
  });

  describe('using --coffee option', function () {
    beforeEach(function (done) {
      helpers
        .run(appDir)
        .inDir(tempDir)
        .withOptions({ coffee: true })
        .on('end', done);
    });

    [
      'src/kata.coffee',
      'test/kata.spec.coffee'
    ]
    .forEach(function (f) {
      it(t('creates <%= file %>')({file:f}), function () {
        assert.file(f);
      });
    });
  });
});
