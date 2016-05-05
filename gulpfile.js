var gulp = require('gulp'); // Load Gulp!
// Now that we've installed the uglify package
// we can require it!
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('default', ['uglify', 'scss', 'js', 'browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        proxy: 'http://192.168.33.10/peer-review/Instanews-1'
    });

    gulp.watch('./src/scripts/*.js', ['uglify']);
    gulp.watch('./src/css/*.scss', ['scss']);
    gulp.watch('./src/scripts/*.js', ['js']); //added this for js
    gulp.watch(['./build/**/*.*', 'index.html', './src/**/*.*'])
        .on('change', browserSync.reload);
});

gulp.task('scss', function (){
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

//added this task to complement the js watch
gulp.task('js', function(){
    return gulp.src('./src/scripts/*.js') // What files do we want gulp to consume?
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('./build')) // Where do we put the result?
});


gulp.task('uglify', function(){
    return gulp.src('./src/*.js') // What files do we want gulp to consume?
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('./build')) // Where do we put the result?
});



//Mack's Code

// var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var browserSync = require('browser-sync').create();
// var sass = require('gulp-sass');
// gulp.task('default', ['uglify', 'browser-sync']);
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         open: false,
//         proxy: '192.168.33.10/project02'
//     });
//
//     // Watch tasks
//     gulp.watch('./src/*.js', ['uglify']);
//     gulp.watch('./src/*.scss', ['scss']);
//
//     gulp.watch(['./build/**/*.*', 'index.html'])
//         .on('change', browserSync.reload);
// });
// gulp.task('scss', function(){
//    return gulp.src('./src/*.scss')
//               .pipe(sass().on('error', sass.logError))
//               .pipe(gulp.dest('./build'));
// });
// gulp.task('uglify', function(){
//    return gulp.src('./src/*.js') // What files do we want gulp to consume?
//         .pipe(uglify()) // Call the uglify function on these files
//         .pipe(gulp.dest('./build')) // Where do we put the result?
// });
