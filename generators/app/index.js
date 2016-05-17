'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.blue('Enterprise Solutions Delivery Team') + ' Generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'includeBootstrap',
        message: 'Would you like to include bootstrap?',
        default: false
      }
    ];

    return this.prompt(prompts).then(function (answers) {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('proj-files'),
      this.destinationPath(this.answers.name)
    );
    this.fs.copyTpl(
      this.templatePath('config-files/package.json'),
      this.destinationPath(this.answers.name + '/package.json'), {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('ide-files'),
      this.destinationPath(this.answers.name + '/.idea'), {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('config-files/projname.iml'),
      this.destinationPath(this.answers.name + '/.idea/' + this.answers.name + '.iml' ), {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('config-files/_.name'),
      this.destinationPath(this.answers.name + '/.idea/.name'), {
        name: this.answers.name
      }
    );
    if(this.answers.includeBootstrap) {
      this.fs.copy(
        this.templatePath('config-files/bower.json'),
        this.destinationPath(this.answers.name + '/bower.json')
      );
    }
    this.fs.copy(
      this.templatePath('config-files/_.babelrc'),
      this.destinationPath(this.answers.name + '/.babelrc')
    );
    this.fs.copy(
      this.templatePath('config-files/_.gitignore'),
      this.destinationPath(this.answers.name + '/.gitignore')
    );
    this.fs.copy(
      this.templatePath('config-files/_.typingsrc'),
      this.destinationPath(this.answers.name + '/.typingsrc')
    );
  },

  install: function () {
    var npmdir = process.cwd() + '/' + this.answers.name;
    process.chdir(npmdir);

    this.installDependencies({
      bower: this.answers.includeBootstrap,
      npm: true
    });
  }

});
