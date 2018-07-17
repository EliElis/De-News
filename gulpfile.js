var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	image = require('gulp-image'),
	cache = require('gulp-cache'),
	cleanCSS = require('gulp-clean-css'),
//	uglify = require('gulp-uglify'),
	del = require('del');

gulp.task('serve', ['sass'], function () {
	browserSync.init({
		server: "dist/"
	});
	
	gulp.watch("app/css/*.sass", ['sass']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
	return gulp.src("app/css/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'], 
			cascade: false
		}))
	    .pipe(cleanCSS())
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task('image', function () {
	gulp.src('app/img/**/*')
	.pipe(cache(image()))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('html', function () {
	return gulp.src('app/*.html').pipe(gulp.dest('dist'))
});


gulp.task('json', function () {
	return gulp.src('app/*.json').pipe(gulp.dest('dist'))
});


gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'))
});

gulp.task('js', function () {
	gulp.src('app/js/**.js')
//	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
});

gulp.task('clean', function() {
  return del.sync('dist');
})



gulp.task('build', ['clean', 'sass', 'image', 'html', 'fonts', 'js', 'json','serve']);
gulp.task('default', ['build']);

