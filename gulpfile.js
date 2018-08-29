//引入
let gulp = require('gulp');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let pump = require('pump');
let babel = require('gulp-babel');
let sass = require('gulp-sass');

gulp.task('compressJs',cb=>{
    pump([
        //匹配文件
        gulp.src('./src/js/*.js'),
        //合并文件
        concat('page.js',{newLine:';'}),
        //输出到硬盘
        gulp.dest('./dist'),
        //转换
        babel({
            presets:['env']
        }),
        //压缩
        uglify(),
        rename({
            suffix:'.min',//后缀名
        }),
        gulp.dest('./dist')
    ],cb);
})

gulp.task('compileSass',function(){
    //执行任务时会执行这里的代码

    //在此把sass编译成css
    //2.找出sass文件
    gulp.src(['./src/sass/*.scss'])//返回一个文件流

    //编译scss->scss
    .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))//得到css文件流
    //输出到硬盘
    .pipe(gulp.dest('./src/css/'));
});

//自动刷新页面
//文件有修改，自动刷新页面
var browserSync = require('browser-sync');

gulp.task('server',function(){
    //启动一个自动刷新的服务器
    browserSync({
        //创建一个静态服务器
        //server:'./src',
        //指定端口
        port:1979,
        //代理服务器
        //用browserSync代理服务器
        // *识别php
        // *自动刷新
        proxy:'http://localhost:1996',
        //监听文件修改
        files:['./src/**/*.html','./src/css/*.css']
    });
    //添加sass修改
    gulp.watch('./src/sass/*.scss',['compileSass']);
})