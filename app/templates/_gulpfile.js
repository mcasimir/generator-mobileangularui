/*=====================================
=            Configuration            =
=====================================*/

var config = {
  vendor: {
    js: [
      './bower_components/angular/angular.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js'
    ],

    fonts: [
      './bower_components/font-awesome/fonts/fontawesome-webfont.*'
    ]
  },

  server: {
    host: '0.0.0.0',
    port: '8000'
  }
};

/*-----  End of Configuration  ------*/


/*========================================
=            Requiring stuffs            =
========================================*/

var gulp           = require('gulp'),
    seq            = require('run-sequence'),
    connect        = require('gulp-connect'),
    less           = require('gulp-less'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps'),
    cssmin         = require('gulp-cssmin'),
    order          = require('gulp-order'),
    concat         = require('gulp-concat'),
    rimraf         = require('rimraf'),
    imagemin       = require('gulp-imagemin'),
    pngcrush       = require('imagemin-pngcrush'),
    templateCache  = require('gulp-angular-templatecache'),
    path           = require('path');


/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('err', function(e) {
  console.log(e.err.stack);
});


/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  rimraf('./public', cb);
});


/*==========================================
=            Start a web server            =
==========================================*/

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    host: config.server.host,
    port: config.server.port,
    livereload: true
  });
});


/*==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload', function () {
  gulp.src('./public/*.html')
    .pipe(connect.reload());
});


/*=====================================
=            Minify images            =
=====================================*/

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
      }))
      .pipe(gulp.dest('public/assets/images'));
});


/*==================================
=            Copy fonts            =
==================================*/

gulp.task('fonts', function() {
  return gulp.src(config.vendor.fonts)
  .pipe(gulp.dest('./public/assets/fonts/'));
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {
  return gulp.src([
  'src/html/**/*.html'])
  .pipe(gulp.dest('./public/'));
});
 

/*========================================================================
=            Precompile angular templates to js and minify it            =
========================================================================*/

gulp.task('templates', function() {
  return gulp.src(['src/templates/**/*.html'])
  .pipe(templateCache({
    module: '<%= appModule %>'
  }))
  .pipe(uglify())
  .pipe(gulp.dest('./public/assets/js'));
});


/*======================================================================
=            Compile and minify less generating source maps            =
======================================================================*/

gulp.task('less', function () {
  gulp.src(['./src/less/app.less', './src/less/responsive.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.resolve(__dirname, 'src/less'), path.resolve(__dirname, 'bower_components') ]
    }))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/css'));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

gulp.task('js', function() {
  gulp.src(config.vendor.js.concat([
      './src/js/*/*.js',
      './src/js/app.js'
    ]))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js'));
});


/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
  gulp.watch(['./public/**/*'], ['livereload']);
  gulp.watch(['./src/templates/**/*'], ['templates']);
  gulp.watch(['./src/html/**/*'], ['html']);
  gulp.watch(['./src/less/**/*'], ['less']);
  gulp.watch(['./src/js/**/*'], ['js']);
  gulp.watch(['./src/images/**/*'], ['images']);
});


/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  seq('clean', ['html', 'templates', 'fonts', 'images', 'less', 'js'], done);
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', ['build', 'connect', 'watch']);