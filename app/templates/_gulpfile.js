/*=====================================
=            Configuration            =
=====================================*/

var config = {
  dest: 'www',
  minify_images: true,
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
    ignore         = require('gulp-ignore'),
    rimraf         = require('gulp-rimraf'),
    imagemin       = require('gulp-imagemin'),
    pngcrush       = require('imagemin-pngcrush'),
    templateCache  = require('gulp-angular-templatecache'),
    mobilizer      = require('gulp-mobilizer'),
    ngAnnotate     = require('gulp-ng-annotate'),
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
  return gulp.src([
        path.join(config.dest, 'index.html'),
        path.join(config.dest, 'images'),
        path.join(config.dest, 'css'),
        path.join(config.dest, 'js'),
        path.join(config.dest, 'fonts')
      ], { read: false })
     .pipe(rimraf());
});

/*==========================================
=            Start a web server            =
==========================================*/

gulp.task('connect', function() {
  connect.server({
    root: config.dest,
    host: config.server.host,
    port: config.server.port,
    livereload: true
  });
});


/*==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload', function () {
  gulp.src(path.join(config.dest, '*.html'))
    .pipe(connect.reload());
});


/*=====================================
=            Minify images            =
=====================================*/

gulp.task('images', function () {
  var stream = gulp.src('src/images/**/*')
  
  if (config.minify_images) {
    stream = stream.pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
  };
  
  return stream.pipe(gulp.dest(path.join(config.dest, 'images')));
});


/*==================================
=            Copy fonts            =
==================================*/

gulp.task('fonts', function() {
  return gulp.src(config.vendor.fonts)
  .pipe(gulp.dest(path.join(config.dest, 'fonts')));
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {
  return gulp.src([
  'src/html/**/*.html'])
  .pipe(gulp.dest(config.dest));
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
  .pipe(gulp.dest(path.join(config.dest, 'js')));
});


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('less', function () {
  gulp.src(['./src/less/app.less', './src/less/responsive.less'])
    .pipe(less({
      paths: [ path.resolve(__dirname, 'src/less'), path.resolve(__dirname, 'bower_components') ]
    }))
    .pipe(mobilizer('app.css', {
      'app.css': {
        hover: 'exclude',
        screens: ['0px']      
      },
      'hover.css': {
        hover: 'only',
        screens: ['0px']
      }
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(config.dest, 'css')));
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
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});


/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
  gulp.watch([config.dest + '/**/*'], ['livereload']);
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
  var tasks = ['html', 'templates', 'fonts', 'images', 'less', 'js'];
  seq('clean', tasks, done);
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  seq('build', ['connect', 'watch'], done);
});