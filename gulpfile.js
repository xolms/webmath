var gulp           = require('gulp'),
gutil          = require('gulp-util' ),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
concat         = require('gulp-concat'),
uglify         = require('gulp-uglify'),
cleanCSS       = require('gulp-clean-css'),
rename         = require('gulp-rename'),
del            = require('del'),
jade           = require('gulp-jade'),
imagemin       = require('gulp-imagemin'),
pngquant       = require('imagemin-pngquant'),
cache          = require('gulp-cache'),
autoprefixer   = require('gulp-autoprefixer'),
fileinclude    = require('gulp-file-include'),
gulpRemoveHtml = require('gulp-remove-html'),
bourbon        = require('node-bourbon'),
ftp            = require('vinyl-ftp'),
extender			 = require('gulp-html-extend'),
notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
gulp.task('extend', function () {
    gulp.src('app/html/*.html')
        .pipe(extender({annotations:true,verbose:false})) // default options 
        .pipe(gulp.dest('app'))
 
});
gulp.task('sass',  function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({includePaths: [require('node-bourbon').includePaths, require('bourbon-neat').includePaths]}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		// 'app/libs/magnific-popup/magnific-popup.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync', 'jade'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/index.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/jade/*.jade', ['jade']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('buildhtml', function() {
	gulp.src(['app/html/*.html'])
	.pipe(fileinclude({
		prefix: '@@'
	}))
	.pipe(gulpRemoveHtml())
	.pipe(gulp.dest('dist/index.html'))
});
gulp.task('jade', function() {
  return gulp.src('app/jade/*.jade')
    .pipe(jade({
    	pretty: true
    }).on("error", notify.onError()))
    //.pipe(obfuscate())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/css/*.css'
		]).pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
		]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
