var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	del = require('del'),
	gulpAsar = require('gulp-asar'),
	shell = require('gulp-shell'),

	paths = {
		prebuild:'.prebuild',
		distributables:'.dist',
		scripts: 'app/**.js',
		html: 'index.html',
		images: 'app/images/*.*'
	};


gulp.task('clean', function () {
	return del([paths.prebuild, paths.distributables]);
});

gulp.task('images', ['clean'], function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.prebuild));
});

gulp.task('scripts', ['clean'], function () {
	return gulp.src('app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.prebuild+'/scripts'));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('copyHTML', ['clean'], function () {
	return gulp.src(['index.html', 'index.css'])
		.pipe(gulp.dest(paths.prebuild));
});

gulp.task('copyApp', ['clean'], function () {
	return gulp.src(['./index.js', 'games/**/*', 'bower_components/**/*.*', 'package.json', 'mock.icns'], {
		base: '.'
	}).pipe(gulp.dest(paths.prebuild));

});

//gulp.task('copyServer', ['clean'], function () {
//	return gulp.src(['server/**'], {
//		base: '.'
//	}).pipe(gulp.dest(paths.prebuild));
//});

gulp.task('package', ['clean'], function () {
	return gulp.src('proxy/**/*')
		.pipe(gulpAsar('app.asar'))
		.pipe(gulp.dest(paths.distributables));
});

gulp.task('deployall', ['images', 'copyHTML', 'scripts', 'copyApp', 'package'], shell.task([
	'npm run-script build'
]));

gulp.task('default', ['images', 'copyHTML', 'copyApp', 'watch']);
