'use strict';

import gulp from 'gulp';
import ts from "gulp-typescript";
import embedTemplates from 'gulp-angular-embed-templates';
import preprocess from 'gulp-preprocess';
import sourcemaps from 'gulp-sourcemaps';
import runSequence from 'run-sequence';
import rimraf from 'gulp-rimraf';
import settings from './gulp.settings';
import concat from 'gulp-concat';
import gulpIf from 'gulp-if';
import uglify from 'gulp-uglify';
import karma from 'karma';
import flatten from  'gulp-flatten';

gulp.task(settings.tasks.setDevelopment, () => {
  return process.env.ENV = settings.environments.dev;
});

gulp.task(settings.tasks.setQa, () => {
  return process.env.ENV = settings.environments.qa;
});

gulp.task(settings.tasks.setStaging, () => {
  return process.env.ENV = settings.environments.stg;
});

gulp.task(settings.tasks.setProduction, () => {
  return process.env.ENV = settings.environments.prd;
});

gulp.task(settings.tasks.setMultipleBuilds, () => {
  return process.env.MULTIPLE_ENV = true;
});

gulp.task(settings.tasks.bundleCss, () => {
  gulp.src(settings.cssSource).pipe(concat(settings.dist.cssBundle)).pipe(gulp.dest(settings.dist.cssDestination.replace('@ENV', process.env.ENV)));
});

gulp.task(settings.tasks.bundleFonts, () => {
  gulp.src(settings.fontsSource).pipe(gulp.dest(settings.dist.fontsDestination.replace('@ENV', process.env.ENV)));
});

gulp.task(settings.tasks.bundleLibs, () => {
  gulp.src(settings.libsSource).pipe(gulp.dest(settings.dist.libDestination.replace('@ENV', process.env.ENV)));
});

gulp.task(settings.tasks.bundleTemplates, () => {
  gulp.src(settings.templateSource)
    .pipe(preprocess({context: { ENV: process.env.ENV, DIST_ROOT: process.env.ENV != settings.environments.dev ? '' :  'dist/'+process.env.ENV+'/' }}))
    .pipe(flatten())
    .pipe(gulp.dest(process.env.ENV != settings.environments.dev ? settings.dist.root.replace('@ENV', process.env.ENV) : '.'));
});

function getTypingsDependencies(proj) {
  var all = [];
  all.push('./typings/**/*.d.ts');
  all.push('./typings_manual/**/*.d.ts');

  var files = proj.config.exclude;
  files.forEach(function (value) {
    if(value == 'typings/main'){
      all.push('!'+ value +'/**/*.d.ts');
    }else{
      all.push('!' + value);
    }
  });

  return all;
}

gulp.task(settings.tasks.bundleJavascript, () => {

  var proj = ts.createProject('tsconfig.json', { outFile: settings.dist.appBundle,  sortOutput: true });
  var all = getTypingsDependencies(proj);

  var stream = () =>  {
    return gulp.src(all.concat(settings.appTsSource))
      .pipe(sourcemaps.init())
      .pipe(preprocess({context: { ENV: process.env.ENV }}))
      .pipe(embedTemplates())
      .pipe(ts(proj));
  };
  stream().js
    .pipe(gulpIf(process.env.ENV == settings.environments.dev || settings.environments.qa, sourcemaps.write('.')))
    .pipe(gulpIf(process.env.ENV == settings.environments.stg || process.env.ENV == settings.environments.prd, uglify({ mangle: false })))
    .pipe(gulp.dest(settings.dist.jsDestination.replace('@ENV', process.env.ENV)));
});


gulp.task(settings.tasks.compile,  () => {
  var proj = ts.createProject('tsconfig.json', { sortOutput: true, sourceMap: true });
  var all = getTypingsDependencies(proj);

  var stream = () =>  {
    return gulp.src(all.concat(settings.rootTsSource), {base : '.'})
      .pipe(sourcemaps.init())
      .pipe(preprocess({context: { ENV: settings.environments.dev  }}))
      .pipe(embedTemplates())
      .pipe(ts(proj));
  };
  return stream().js
    .pipe(sourcemaps.write({includeContent: false,   sourceRoot: function(file) {
      var dir = file.sourceMap.file.split('/');
      var relativePath = '';
      if(dir.length > 0){
        for (var i = 0; i < dir.length - 1; i++) {
          relativePath = relativePath + '../';
        }
      }
      return relativePath;
    }}))
    .pipe(gulp.dest('.'));
});

gulp.task(settings.tasks.clean, function () {
  return gulp.src(settings.cleanSource, { read: false }).pipe(rimraf());
});


gulp.task(settings.tasks.watchCss, function () {
  return gulp.watch(settings.cssSource, [settings.tasks.bundleCss]);
});

gulp.task(settings.tasks.watchAppJavascript, function () {
  return gulp.watch([settings.appTsSource], () => {
    return runSequence(settings.tasks.bundleJavascript, settings.tasks.compile);
  });
});

gulp.task(settings.tasks.watchTestJavascript, function () {
  return gulp.watch([settings.testTsSource], () => {
    return gulp.start(settings.tasks.compile);
  });
});

gulp.task(settings.tasks.watchHtml, function () {
  return gulp.watch(settings.htmlSource, [settings.tasks.bundleJavascript]);
});

gulp.task(settings.tasks.default, () =>{
  return gulp.start(settings.tasks.buildDevelopment);
});

gulp.task(settings.tasks.buildDevelopment, [settings.tasks.clean, settings.tasks.setDevelopment],  () => {
  runSequence(settings.tasks.bundleApp, settings.tasks.watchAppJavascript, settings.tasks.watchTestJavascript, settings.tasks.runTests);
});

gulp.task(settings.tasks.buildQa, [settings.tasks.clean, settings.tasks.setQa],  () => {
  runSequence(settings.tasks.bundleApp, settings.tasks.runTests);
});

gulp.task(settings.tasks.buildStaging, [settings.tasks.clean, settings.tasks.setStaging],  () => {
  runSequence(settings.tasks.bundleApp, settings.tasks.runTests);
});

gulp.task(settings.tasks.buildProduction, [settings.tasks.clean, settings.tasks.setProduction],  () => {
  runSequence(settings.tasks.bundleApp, settings.tasks.runTests);
});


gulp.task(settings.tasks.build, [settings.tasks.clean, settings.tasks.setMultipleBuilds],  () => {

  runSequence(
    settings.tasks.setDevelopment, settings.tasks.bundleApp,
    settings.tasks.setQa, settings.tasks.bundleApp,
    settings.tasks.setStaging, settings.tasks.bundleApp,
    settings.tasks.setProduction, settings.tasks.bundleApp,
    settings.tasks.runTests);
});

gulp.task(settings.tasks.bundleApp, () => {
  runSequence(settings.tasks.bundleJavascript, settings.tasks.bundleCss, settings.tasks.bundleFonts, settings.tasks.bundleLibs, settings.tasks.bundleTemplates);
});

gulp.task(settings.tasks.runTests, (done) => {
  runSequence(settings.tasks.compile, settings.tasks.runKarma);
});

gulp.task(settings.tasks.runKarma, (done) => {
  new karma.Server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});
