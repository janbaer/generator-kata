# generator-kata [![Build Status](https://secure.travis-ci.org/janbaer/generator-kata.png?branch=master)](https://travis-ci.org/janbaer/generator-kata)

A generator for [Yeoman](http://yeoman.io).

## Getting Started

This generator generates a directory structure to write a kata like GameOfLife with JavaScript in TDD. The current version of this generator uses Jasmine with the BDD style to write you tests and Karma as testrunner.

The following global modules are required for this

- karma
- yeoman
- generator-kata

After you've installed all required modules you just have to enter **yo kata** in the directory in that you'll save the files.

After

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### About the Kata Generator

This generator generates a basic folder structure to develop a kata with JavaScript.

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

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
