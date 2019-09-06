const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync'); 
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream:true}));
});

gulp.task('js', () => {
    return gulp.src('./src/scripts/*.js')
		.pipe(plumber({
		  errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(babel())
		.pipe(gulp.dest('./dist/'))
		.pipe(reload({stream:true}));
});

gulp.task('bs', () => {
	return browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('watch',() => {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/**/*.scss', ['styles']);
    gulp.watch('./dist/main.css', reload);
    gulp.watch('./*.html',reload);
});

gulp.task('default',['styles','js','watch','bs']);