/**
 * Created by stefan on 12.09.17.
 * gulp-clean is replaced by gulp-rimraf
 * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 */

/* jshint node: true */
"use strict";

/**
 *
 * @type {*}
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf')

/**
 *
 * @type {{dist: {bower: string, html: string, php: string, js: string, css: string, img: string, fonts: string}, src: {bower: string, twig: string, yml: string, theme: string, js: string, style: string, img: string, fonts: string}, watch: {twig: string, yml: string, theme: string, js: string, style: string, img: string, fonts: string}, clean: string}}
 */

var path = {
    dist: {
        bower:'dist/bower_components/',
        twig: 'dist/',
        yml: 'dist/',
        theme: 'dist',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        bower: 'bower_components/**/*.*',
        twig: 'templates/**/*.twig',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/styles.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    watch: {
        twig: 'templates/**/*.twig',
        yml: '*.yml',
        theme: '*.theme',
        js: 'js/**/*.js',
        style: 'sass/**/*.scss',
        img: 'images/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './dist'
};

/**
 * clean task
 */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/**
 * task
 */
gulp.task('bower:dist', function () {
    gulp.src(path.src.bower)
        .pipe(gulp.dest(path.dist.bower));
});


gulp.task('twig:dist', function () {
    gulp.src(path.src.twig)
        .pipe(gulp.dest(path.dist.twig));
});


gulp.task('yml:dist', function () {
    gulp.src(path.src.yml)
        .pipe(gulp.dest(path.dist.yml));
});

gulp.task('theme:dist', function () {
    gulp.src(path.src.theme)
        .pipe(gulp.dest(path.dist.theme));
});

gulp.task('js:dist', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('img:dist', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:dist', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('dist', [
    'bower:dist',
    'twig:dist',
    'yml:dist',
    'theme:dist',
    'js:dist',
    'style:dist',
    'fonts:dist',
    'img:dist'
]);

/**
 * Watch
 */

gulp.task('watch', function(){
    watch([path.watch.twig], function(event, cb) {
        gulp.start('twig:dist');
    });
    watch([path.watch.yml], function(event, cb) {
        gulp.start('yml:dist');
    });
    watch([path.watch.theme], function(event, cb) {
        gulp.start('theme:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dist');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dist');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:dist');
    });
});


gulp.task('default', ['dist', 'watch']);





