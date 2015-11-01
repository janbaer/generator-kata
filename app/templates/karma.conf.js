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
        presets: ['es2015'],
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
        sourceMap: false, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true // (optional) Do not emit comments to output.
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
