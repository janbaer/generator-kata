# generator-kata

A generator for [Yeoman](http://yeoman.io).

## Getting Started

This generator generates a directory structure to write a kata like GameOfLife
with JavaScript or CoffeeScript in TDD.  The current version of this generator
uses Jasmine with the BDD style to write you tests. It uses Karma as testrunner
and phantom.js as browser.

To work with this template do the following steps:

* install karma as global node module with **npm install karma -g**
* install phantom.js as global node module with **npm install phantomjs -g**
* all other dependencies will be automatically installed after the generator has been executed

After you've installed all required modules you just have to enter **yo kata**
in the directory in that you'll save the files. When you enter **yo kata --coffee**
karma will use the coffee-script preprocessor and you can use **CoffeeScript** as language.

* run **npm start** to execute the tests with the PhantomJS Browser
* run **npm test** to execute the tests with ChromeCanary or Chrome with the ability to debug your tests.

Since version 0.0.10 ES6 is supported with the [6to5](http://6to5.org/) transpiler.
It is integrated via a karma preprocessor. That means that all your code will automatically
transpiled to ES5 code before the tests will be executed.

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Version history

* 0.23
  * Use always the latest version of dependent npm modules
* 0.22
  * Updated the version of some npm modules
* 0.19
  * Switched from 6to5 to babel
  * Karma searches just for coffee files when user wants to use coffee.
* 0.18
  * Add option to choose between **JavaScript** or **CoffeeScript**
  (Thanks to @ilkererde for his contribution)
* 0.17
  * Fix problem with missing dependencies
  * Add option if dependencies shall automatically installed
* 0.13
  * Name of author removed
  * Name of kata will be used for file names
  * Add some aliases for *beforeEach* like *establish* and *because* to clarify the sense of a code block
* 0.10
  * Add support for ES6 via the karma 6to5 preprocessor
* 0.09
  * Installation of Growl reporter is optional

