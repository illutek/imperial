/**
 * Created by stefan on 12.09.17.
 * gulp-clean is replaced by gulp-rimraf
 * http://learningwithjb.com/posts/cleaning-our-build-folder-with-gulp
 */

/* jshint node: true */
"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');
//var browserSync = require('browser-sync').create();

// //////////////////////////////////////////////
// Sass to css and copy to /dist
// /////////////////////////////////////////////
gulp.task('sass', function () {
    return gulp.src('sass/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('css'));
});


// ////////////////////////////////////////////
// Copy twig files to dist/templates
// ///////////////////////////////////////////
gulp.task('copyTwig', ['clean:twigfiles'], function(){
    gulp.src('templates/**/*.twig')
        .pipe(gulp.dest('dist/templates'));
});

// //////////////////////////////////////////////
// Copy files to root
// //////////////////////////////////////////////////////////
var filesToMove = [
    './*.yml',
    './*.theme',
    './readme.md',
    './*html',
    './*.png'
];
gulp.task('copySeparateFiles', ['clean:separateFiles'], function(){
    gulp.src(filesToMove, {base: './'})
        .pipe(gulp.dest('dist/'));
});


// ////////////////////////////////////////////
// Minify JS and copy JS files to dist/js
// ///////////////////////////////////////////
gulp.task('minify', ['clean:jsfiles'], function() {
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// /////////////////////////////////////////////
// Optimize Images and copy to dist/images
// gulp.task('imageMin', () => = nieuwe syntax
// /////////////////////////////////////////////
gulp.task('imageMin', ['clean:imagefiles'], function(){
    gulp.src('images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('dist/images'));
});

// ///////////////////////////////////////////////////
// Copy Bower_components to dist folder
// ///////////////////////////////////////////////////

gulp.task('copyBower', ['clean:bower'], function () {
    gulp.src('bower_components/**/*.*')
        .pipe(gulp.dest('dist/bower_components'));
});

// ///////////////////////////////////////////////////
// Clean up dist folder
// //////////////////////////////////////////////////

gulp.task('clean:jsfiles', function () {
    return del(['dist/js/**/*']);
});


// Clean the templates folder
gulp.task('clean:twigfiles', function () {
    return gulp.src('dist/templates', {read: false})
        .pipe(clean());
});

// Clean the SeparateFiles
var rootFiles = [
    'dist/**/*.yml',
    'dist/**/*.theme',
    'dist/*.html'
];
gulp.task('clean:separateFiles', function () {
    return gulp.src(rootFiles, {read: false})
        .pipe(clean());
});

// Clean the images folder
gulp.task('clean:imagefiles', function () {
    return gulp.src('dist/images', {read: false})
        .pipe(clean());
});

// Clean the Bower folder
gulp.task('clean:bower', function () {
    return gulp.src('dist/bower_components', {read: false})
        .pipe(clean());
});

// gulp.task('clean', function(cb) {
//     // You can use multiple globbing patterns as you would with `gulp.src-notused`
//     del(['build'], cb);
// });

// Clean the whole dist folder
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

// ///////////////////////////////////////////////////
// Watch Task
// ///////////////////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch('sass/**/*.{scss,sass}', ['sass']);
    gulp.watch('images/**/*', ['imageMin']);
    gulp.watch('js/**/*.js', ['minify']);
    gulp.watch('templates/**/*.twig', ['copyTwig']);
    gulp.watch(['*.html', '*.yml', '*.theme'], ['copySeparateFiles']);
});

// ///////////////////////////////////////////////////
// Default Task
// ///////////////////////////////////////////////////
gulp.task('default', ['sass', 'copyTwig', 'copySeparateFiles', 'minify', 'copyBower', 'imageMin', 'watch']);