'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

gulp.task('build', ['sass', 'pug']);

gulp.task('watch', () => {
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
    gulp.watch('./assets/pug/**/*.pug', ['pug']);
});

gulp.task('sass', () => {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
            // ☆IEは9以上、Androidは4以上、iOS Safariは8以上
            // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
            browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'))
});

gulp.task('pug', () => {
    gulp.src(['./assets/pug/**/*.pug', '!./assets/pug/**/_*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'));
});
