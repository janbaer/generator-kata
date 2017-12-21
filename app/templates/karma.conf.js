module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'jasmine-aliases.js',
      'node_modules/phantomjs-polyfill/bind-polyfill.js',<% if (coffee) {%>
      'src/**/*.coffee',<%} else if (typescript) {%>
      'src/**/*.ts',<%} else {%>
      'src/**/*.js'<%}%>
    ],
    exclude: [],
    reporters: [<%- reporters.map(function (reporter) { return '\'' + reporter + '\'' }).join(', ') %>],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,

    preprocessors: {
      <% if (babel) {%>
      'src/**/*.js': ['babel']
      <%} else if (coffee) {%>
      'src/**/*.coffee': ['coffee']
      <%} else if (typescript) {%>
      'src/**/*.ts': ['typescript']
      <%}%>
    },
    <% if (babel) {%>
    'babelPreprocessor': {
      options: {
        presets: ['env'],
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },
    <%}%>
    <% if (coffee) {%>
    'coffeePreprocessor': {
      options: {
        sourceMap: true
      },
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    },
    <%}%>
    <% if (typescript) { %>
    typescriptPreprocessor: {
      options: {
        sourceMap: true, // (optional) Generates corresponding .map file.
        noResolve: false, // (optional) Skip resolution and preprocessing.
      },
      typings: [
        'typings/*.d.ts'
      ],
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    }
    <%}%>
  });
};
