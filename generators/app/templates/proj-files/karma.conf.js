import settings from './gulp.settings';

var devMode = process.env.ENV && process.env.ENV == settings.environments.dev && (!process.env.MULTIPLE_ENV)? true : false;
var browsers = [devMode ? 'Chrome' : 'PhantomJS'];

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // Polyfills.
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // System.js for module loading
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',

      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


      {pattern: 'karma-test-shim.js', included: true, watched: false},
      {pattern: 'src/test/matchers.js', included: true, watched: false},


      // paths loaded via module imports
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},


    // paths loaded via module imports
    {pattern: 'src/**/*.js', included: false, watched: true},

    // paths to support debugging with source maps in dev tools
    {pattern: 'src/**/*.ts', included: false, watched: false},
    {pattern: 'src/**/*.js.map', included: false, watched: false}
  ],

  plugins : [
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-spec-reporter',
    'karma-jasmine'
  ],

  // proxied base paths
  proxies: {
    "/app/": "/base/src/app/"
  },

  reporters: ['spec'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: browsers,
      singleRun: false
  })
}