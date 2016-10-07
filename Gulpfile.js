var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('styles', function(){
	gulp
		.src("index.scss")
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('public'));
});

gulp.task('assets', function(){
	gulp
		.src('assets/*')
		.pipe(gulp.dest('public'))
});

gulp.task('scripts', function(){
	browserify('./src/index.js') //Here we can process this file with broswerify
		.transform(babel) // parse the code using babel EMACS 2015
		.bundle() // Recived the bundle
		.pipe(source('index.js'))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public'));
})

gulp.task('default', ['styles', 'assets', 'scripts']);