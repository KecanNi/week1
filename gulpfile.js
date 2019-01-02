var gulp=require('gulp');
var sass = require('gulp-sass');  //编译scss
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat');  //合并文件
var uglify = require('gulp-uglify');  //压缩js
// var babel = require('gulp-babel');   //es6 ----> es5
var htmlmin = require('gulp-htmlmin');  //压缩html插件
var server = require('gulp-webserver');  //起服务

//编译scss
gulp.task('css',function(){
    return gulp.src('./src/scss/*.scss')
            .pipe(sass())
            .pipe(concat('index.css'))
            .pipe(clean())
            .pipe(gulp.dest('./src/css'))
})

//监听scss
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('css','js'));
})

function serverFun(servers){
    return gulp.src(servers)
        .pipe(server({
            port:8080,
            livereload:true,
            middlewear:function(req,res,next){

            }
        }))
}
gulp.task('browserSync',function(){
    return server('src')
})
//默认执行任务
gulp.task('default',gulp.series('css','watch','browserSync'))
/* ------------------------------------------------------------- */

//压缩js
gulp.task('js',function(){
    return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})
//压缩css
gulp.task('bcss',function(){
    return gulp.src('./src/css/*.css')
            .pipe(gulp.dest('./dist/css'))
})
//压缩html
gulp.task('bhtml',function(){
    return gulp.src('./src/**/*.html')
            .pipe(htmlmin())
            .pipe(gulp.dest('./dist'))
})
//压缩图片
gulp.task('bimages',function(){
    return gulp.src('./src/images/*')
            .pipe(gulp.dest('./dist/images'))
})
gulp.task('bfont',function(){
    return gulp.src('./src/fonts/*')
            .pipe(gulp.dest('./dist/fonts'))
})
gulp.task('build',gulp.series('js','bcss','bhtml','bimages','bfont'))