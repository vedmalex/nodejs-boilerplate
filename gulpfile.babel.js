import gulp  from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del  from 'del';
import glob  from 'glob';
import babel from 'gulp-babel';
import path  from 'path';
import manifest  from './package.json';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import nodemon from 'gulp-nodemon';

// Load all of our Gulp plugins
const $ = loadPlugins();

// Gather the library data from `package.json`
const config = manifest.buildOptions;

const destinationFolder = config.destination;

function cleanDist(done) {
  del([destinationFolder]).then(() => done());
}

function onError() {
  $.util.beep();
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'))
    .on('error', onError);
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

const watchFiles = ['src/**/*', 'package.json', '**/.eslintrc', '.jscsrc'];

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['clean', 'node6']);
}

function babelify(...preset) {
  return gulp.src(['src/**/*.js'])
    .pipe(babel({
      presets: preset
    }))
    .pipe(gulp.dest(destinationFolder));
}

function node6() {
  return babelify('es2015-node6', 'stage-0', 'react');
}

function nmonitor() {
  nodemon({
    script: 'dist/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  });
}

gulp.task('demon', nmonitor);

gulp.task('default', ['watch', 'demon']);

// Remove the built files
gulp.task('clean', cleanDist);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-gulpfile']);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('node6', node6);

