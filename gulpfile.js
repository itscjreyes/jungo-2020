const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync'); 
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const exec = require('child_process').exec;
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

gulp.task('fetch',() => {
  exec('npx hscms fetch --portal=portal-name hubspot-folder-name dist', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

gulp.task('overwrite',() => {
  exec('npx hscms fetch --overwrite --portal=portal-name hubspot-folder-name dist', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

gulp.task('publish',() => {
  exec('npx hscms upload --portal=portal-name --mode=publish dist hubspot-folder-name', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

gulp.task('draft',() => {
  exec('npx hscms upload --portal=portal-name --mode=draft dist hubspot-portal-name', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

gulp.task('default',['styles','js','watch','bs']);