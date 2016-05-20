/**
 * Created by jiggy on 4/22/2016.
 */
var settings = {
  cssSource: ['./src/app/content/styles/**/*.css', './src/**/*.css'],
  fontsSource: [],
  libsSource: [],
  htmlSource: [],
  templateSource: ['./src/templates/*'],
  rootTsSource: './src/**/*.ts',
  appTsSource: './src/app/**/*.ts',
  testTsSource: './src/test/**/*.ts',
  cleanSource:['./dist', './src/**/*.js*', '!./src/**/system.config.js'],
  dist: {
    root: './dist/@ENV/',
    jsDestination: './dist/@ENV/js/',
    fontsDestination: './dist/@ENV/fonts/',
    cssDestination: './dist/@ENV/css/',
    libDestination: './dist/@ENV/js/lib/',
    appBundle: 'app-bundle.min.js',
    cssBundle: 'css-bundle.min.css',
    libBundle: 'lib-bundle.min.js'
  },
  environments:{
    dev: 'DEV',
    qa: 'QA',
    stg: 'STG',
    prd: 'PRD'
  },
  tasks: {
    default: 'default',
    build: 'build',
    buildDevelopment: 'build-dev',
    buildQa: 'build-qa',
    buildStaging: 'build-staging',
    buildProduction: 'build-production',
    bundleApp: 'bundle-app',
    bundleJavascript: 'bundle-js',
    bundleJavascriptTests: 'bundle-js-tests',
    bundleCss: 'bundle-css',
    bundleFonts: 'bundle-fonts',
    bundleLibs: 'bundle-libs',
    bundleHtml: 'bundle-html',
    bundleTemplates: 'bundle-templates',
    setDevelopment: 'set-dev-env',
    setQa: 'set-qa-env',
    setStaging: 'set-stg-env',
    setProduction: 'set-prd-env',
    clean: 'clean',
    watchCss: 'watch-css',
    watchAppJavascript: 'watch-app-javascript',
    watchTestJavascript: 'watch-test-javascript',
    watchHtml: 'watch-html',
    runTests: 'run-tests',
    runKarma: 'run-karma',
    compile: 'compile'
  }
};

export default settings;
