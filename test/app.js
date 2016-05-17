'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('When the generator is run with default inputs', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.idea',
      'src',
      'typings',
      'typings_manual',
      'README.md',
      '.babelrc',
      '.gitignore',
      '.typingsrc',
      'package.json',
      'bs-config.json',
      'filetypes.xml',
      'gulp.settings.js',
      'gulpfile.babel.js',
      'index.html',
      'karma.conf.js',
      'karma-test-shim.js',
      'system.config.js',
      'tsconfig.json',
      'typings.json'
    ]);
  });

  it('does not create bower.json', function () {
    assert.noFile([
      'bower.json'
    ]);
  });

});

describe('When the user includes bootstrap', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        includeBootstrap: true
      })
      .toPromise();
  });

  it('creates bower.json file', function () {
    assert.file([
      'bower.json'
    ]);
  });
});

describe('When the user does not include bootstrap', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        includeBootstrap: false
      })
      .toPromise();
  });

  it('does not create bower.json', function () {
    assert.noFile([
      'bower.json'
    ]);
  });
});

describe('When the user specifies a project name', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'testproject'
      })
      .toPromise();
  });

  it('creates .iml file with the project name', function () {
    assert.file([
      '.idea/testproject.iml'
    ]);
  });
});
