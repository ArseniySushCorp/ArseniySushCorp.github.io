//let variables
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');
// task commmand
// *****************
gulp.task('clean',function(){
    del.sync('dist')
});
// convert .pug to html
gulp.task('pug', function(){
    return gulp.src('app/#source/pug/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app'))
});
// convert style.scss to style.min.css
gulp.task('scss', function(){
    return gulp.src('app/#source/scss/style.scss')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
// concat all css in 1 _libs.css
gulp.task('css',function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/materialize-css/dist/css/materialize.css'
    ])
    .pipe(concat('_libs.scss'))  
    .pipe(gulp.dest('app/#source/scss'))
    .pipe(browserSync.reload({stream: true}))
});
// reload browser when html changes
gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});
//reload browser when js changes
gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});
//concat all js files and uglify in one libs.min.js
gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/materialize-css/dist/js/materialize.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}))
});
//Make browser-sync work
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});
//dist package task
gulp.task('export',function(){
    let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))

    let buildCss = gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'))

    let buildjs = gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'))

    let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))

    let buildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
});

// watch command
gulp.task('watch', function(){
    gulp.watch('app/#source/scss/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html',gulp.parallel('html'))
    gulp.watch('app/#source/js/*.js', gulp.parallel('script'))
    gulp.watch('app/#source/pug/*.pug', gulp.parallel('pug'))
});
gulp.task('build',gulp.series('clean','export'))
// default command | work when im write gulp
gulp.task('default', gulp.parallel('css','scss','js','browser-sync', 'watch'))