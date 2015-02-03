# Overview

This package contains a basic folder structure to develop a kata with JavaScript.

It uses Karma as testrunner and phantom.js as browser.

To work with this template do the following steps:

* install karma as global node module with **npm install karma -g**
* install phantom.js as global node module with **npm install phantomjs -g**
* all other dependencies will be automatically installed after the generator has been executed
* run **npm start** to execute the tests with the PhantomJS Browser
* run **npm test** to execute the tests with ChromeCanary or Chrome with the ability to debug your tests.

Since version 0.0.10 ES6 is supported with the [6to5](http://6to5.org/) transpiler.
It is integrated via a karma preprocessor. That means that all your code will automatically
transpiled to ES5 code before the tests will be executed.
