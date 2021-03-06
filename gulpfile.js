'use strict';

var gulp              = require('gulp');
var	gutil             = require('gulp-util');
var	eslint            = require('gulp-eslint');
var	sass              = require('gulp-sass');
var	babel             = require('gulp-babel');
var	sourcemaps        = require('gulp-sourcemaps');
var	concat            = require('gulp-concat');
var	uglify            = require('gulp-uglify');
var	browserSync       = require('browser-sync').create();
var	del               = require('del');
var Server            = require('karma').Server;
var webpack           = require('webpack-stream');
var webpackConfig     = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var source = {
	html: 'source/*.html',
	js: ['source/*.js', 'source/**/*.js'],
	jsEntry: 'source/app.js',
	scss: 'source/scss/*.scss',
	img: 'source/img/*.{png,gif,jpg}'
};

var dest = {
	root: 'public',
	js: 'public/js',
	css: 'public/css',
	img: 'public/img'
};

gulp.task('default', ['build-dev']);
gulp.task('build-dev', ['webpack', 'img', 'sass', 'html']);

gulp.task('clean', function() {
	return del([dest.root]);
});

gulp.task('eslint', function() {
	return gulp.src(source.js)
		.pipe(eslint({
			"extends": "eslint:recommended",
			"env": {
				"browser": true
			},
			"parserOptions": {
						"ecmaVersion": 6,
						"sourceType": "module",
						"ecmaFeatures": {
						"jsx": true
					}
			},
			"rules": {
				"semi": 2
			}
		}))
		.pipe(eslint.format());
});

gulp.task('js', function() {
	return gulp.src(source.js)
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('bundle.js'))
			//.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.root))
		.pipe(browserSync.stream());
});

gulp.task('webpack', function() {
	return gulp.src(source.jsEntry)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(dest.root))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	return gulp.src(source.scss)
		.pipe(sourcemaps.init())
			.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest.css))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src(source.html)
		//.pipe(gulp.dest(dest.root))
		.pipe(browserSync.stream());
});

gulp.task('img', function() {
	return gulp.src(source.img)
		.pipe(gulp.dest(dest.img))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['build-dev'], function() {

	browserSync.init({
		server: {
			baseDir: "./public"
		}
	});

	gulp.watch(source.scss, ['sass']);
	gulp.watch(source.js, ['webpack']);
	gulp.watch(source.html, ['webpack']);
});

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, function() {
		done();
	}).start();
});

gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js'
	}, function () {
		done();
	}).start();
});
