var gulp = require('gulp'),
	compass = require('gulp-compass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	//beautify = require('gulp-beautify'),
	uglify = require('gulp-uglify'),
	minify = require('gulp-minify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	plumber = require('gulp-plumber'),
	path = require('path'),
	closureCompiler = require('gulp-closure-compiler'),
	gulpDocs = require('gulp-ngdocs'),
	bower = require('gulp-bower'),
	underscore = require('underscore'),
	underscoreStr = require('underscore.string'),
	googlecdn = require('gulp-google-cdn'),
	fs = require('fs'),
	del = require('del'),
	gzip = require('gulp-gzip'),
	livereload = require('gulp-livereload'),
	gulpSequence = require('gulp-sequence'),
	browserSync = require('browser-sync').create(),
	print = require('gulp-print');
//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
	title: 'Gulp',
	icon: path.join(__dirname, 'gulp.png')
};
//error notification settings for plumber
var plumberErrorHandler = {
	errorHandler: notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: "Error: <%= error.message %>"
	})
};
gulp.task('dist-css-libs', [], function() {
	var libs = [
		'app/bower_components/normalize-css/normalize.css',
		'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
		'app/bower_components/bootstrap-select/dist/css/bootstrap-select.min.css',
		'app/bower_components/angular-busy/dist/angular-busy.min.css',
		'app/bower_components/angular-ui-grid/ui-grid.min.css',
		'app/bower_components/ng-dialog/css/ngDialog.min.css',
		'app/bower_components/ng-dialog/css/ngDialog-theme-default.min.css',
		'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'app/bower_components/ionicons/css/ionicons.min.css'
	];
	return gulp.src(libs)
		.pipe(concat('libs.css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('dist-css-app', [], function() {
	return gulp.src(['./app/assets/scss/**/*.scss'])
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/assets/css',
			sass: 'app/assets/scss',
			image: 'app/assets/img'
		}))
		.pipe(concat('app.css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});
gulp.task('dist-js-libs', [], function() {
	var libs = [
		'app/bower_components/lodash/lodash.min.js',
		'app/bower_components/jquery/dist/jquery.min.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'app/bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
		'app/bower_components/bootstrap-select/dist/js/i18n/defaults-pt_BR.min.js',
		'app/bower_components/angular/angular.min.js',
		'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
		'app/bower_components/angular-animate/angular-animate.min.js',
		'app/bower_components/angular-cookies/angular-cookies.min.js',
		'app/bower_components/angular-i18n/angular-locale_pt-br.js',
		'app/bower_components/angular-message-format/angular-message-format.min.js',
		'app/bower_components/angular-messages/angular-messages.min.js',
		'app/bower_components/angular-sanitize/angular-sanitize.min.js',
		'app/bower_components/angular-ui-grid/ui-grid.min.js',
		'app/bower_components/angular-ui-mask/dist/mask.min.js',
		'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'app/bower_components/angular-ui-router.stateHelper/statehelper.min.js',
		'app/bower_components/angular-ui-validate/dist/validate.min.js',
		'app/bower_components/angular-promise-tracker/promise-tracker.js',
		'app/bower_components/angular-promise-tracker/promise-tracker-http-interceptor.js',
		'app/bower_components/angular-busy/dist/angular-busy.min.js',
		'app/bower_components/ng-dialog/js/ngDialog.min.js',
		'app/bower_components/restangular/dist/restangular.min.js',
		'app/bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
		'app/bower_components/angular-translate/angular-translate.min.js',
		'app/assets/js/angular-input-masks-standalone.min.js',
		'app/bower_components/angular-br-filters/release/angular-br-filters.min.js',
		'app/bower_components/angular-file-saver/dist/angular-file-saver.bundle.min.js'
	];
	return gulp.src(libs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(minify({
			ext: {
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest('dist/js'));
});
gulp.task('dist-js-app', [], function() {
	return gulp.src(['app/assets/js/**/*.js', 'app/controller/**/*.js', 'app/locale/**/*.js', 'app/service/**/*.js', 'app/filter/**/*.js', 'app/directive/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(minify({
			ext: {
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest('dist/js'));
});
gulp.task('dist-img', ['dist-css'], function() {
	return gulp.src(['app/assets/img/**/*'])
		.pipe(gulp.dest('dist/img'));
});
gulp.task('dist-html', [], function() {
	return gulp.src(['./app/index.dist.html'])
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./dist/'));
});
gulp.task('dist-html-view', [], function() {
	return gulp.src(['app/view/**/*.html'])
		.pipe(gulp.dest('dist/view'));
});
gulp.task('dist-clean', [], function() {
	return del(['dist']);
});
gulp.task('dist-css', gulpSequence(['dist-css-libs', 'dist-css-app']));
gulp.task('dist-js', gulpSequence(['dist-js-libs', 'dist-js-app']));
gulp.task('dist', gulpSequence('dist-clean', ['dist-css', 'dist-js', 'dist-img', 'dist-html', 'dist-html-view']));
gulp.task('dist-update', gulpSequence(['dist-css-app', 'dist-js-app', 'dist-html'], 'dist-img'));
gulp.task('docs', [], function() {
	return gulp.src('app/assets/js/**/*.js')
		.pipe(gulpDocs.process())
		.pipe(gulp.dest('./docs'));
});
gulp.task('css', function() {
	return gulp.src(['./app/assets/scss/**/*.scss'])
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/assets/css',
			sass: 'app/assets/scss',
			image: 'app/assets/img'
		}))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(livereload());
});
gulp.task('js', function() {
	return null;
	return gulp.src(['app/assets/js/**/*.js'])
		.pipe(concat('app-check.js'))
		.pipe(gulp.dest('tmp'))
		.pipe(closureCompiler({
			compilerPath: 'node_modules/closure-compiler/node_modules/google-closure-compiler/compiler.jar',
			fileName: 'tmp/app-check.js',
			tieredCompilation: true,
			continueWithWarnings: false,
			charset: 'UTF-8',
			compilerFlags: {
				charset: 'UTF-8',
				angular_pass: true,
				compilation_level: 'ADVANCED_OPTIMIZATIONS',
				"checks-only": null,
				language_in: 'ECMASCRIPT5'
			}
		}));
});
gulp.task('livereload', [], function() {
	livereload.listen();
	gulp.watch('app/assets/js/**/*.js', ['js', 'docs']);
	gulp.watch('app/assets/scss/**/*.scss', ['css']);
});
gulp.task('js-browsersync', ['js'], browserSync.reload);
gulp.task('css-browsersync', ['css'], browserSync.reload);
gulp.task('browsersync', ['js'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
	gulp.watch("app/assets/js/**/*.js", ['js-browsersync']);
	gulp.watch("app/assets/scss/**/*.scss", ['css-browsersync']);
});
gulp.task('default', function() {
	// place code for your default task here
});
