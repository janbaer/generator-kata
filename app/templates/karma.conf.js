module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/phantom-polyfill.js',
      'test/jasmine-aliases.js',
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',<% if (coffee) { %>
      'src/**/*.coffee',
      'test/**/*.coffee'<%} else {%>
      'src/**/*.js',
      'test/**/*.js'<%}%>
    ],
    exclude: [],
    reporters: [<%= reporters.map(function (reporter) { return '\'' + reporter + '\'' }).join(', ') %>],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,

    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel'],
      'src/**/*.coffee': ['coffee'],
      'test/**/*.coffee': ['coffee']
    },

    'babelPreprocessor': {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    'coffeePreprocessor': {
      options: {
        sourceMap: true
      },
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    }
  });
};
