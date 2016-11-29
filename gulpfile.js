// 引入 gulp及组件
var gulp = require('gulp'),
<<<<<<< HEAD
<<<<<<< HEAD
    rev = require('gulp-rev'),
=======
    rev = require('gulp-rev')
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
    rev = require('gulp-rev')
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
    revCollector  = require('gulp-rev-collector'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    //connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence'),
    replace = require('gulp-replace'),
<<<<<<< HEAD
<<<<<<< HEAD
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),   //开启服务器，实时预览
    reload = browserSync.reload,
    stripDebug = require('gulp-strip-debug'),
    babel = require("gulp-babel"),
    //增加less编译异常提醒
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    imageMin = require('gulp-imagemin');
=======
    htmlmin = require('gulp-htmlmin');
    browserSync = require('browser-sync').create(),   //开启服务器，实时预览
    reload = browserSync.reload;
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
    htmlmin = require('gulp-htmlmin');
    browserSync = require('browser-sync').create(),   //开启服务器，实时预览
    reload = browserSync.reload;
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

var path = {
  src   : "src/",
  css   : "src/css/",
  js    : "src/js/",
  img   : "src/images/",
  build : "build"
<<<<<<< HEAD
<<<<<<< HEAD
};

gulp.task('imgMin', function () {
    gulp.src(path.img + "*.*")
        .pipe(imageMin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/assets/images/'))
});

=======
}
 
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
}
 
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

gulp.task('clean', function () {
    return gulp.src(['dist/','output/'])
        .pipe(clean());
});

gulp.task('jsconcat',function () {
    return gulp.src([
        'src/js/plugins/*.js'])
        .pipe(concat('plugins.js'))//合并后的文件名
        .pipe(gulp.dest('output/'));
});

gulp.task('jsconcat-plugin',function () {
    return gulp.src([
        'src/js/vendor/jquery-2.2.4.js',
        'src/js/vendor/swiper-3.3.1.jquery.min.js'
        ])
        .pipe(concat('vendor.js'))//合并后的文件名
        .pipe(gulp.dest('output/'));
});

gulp.task('jsconcat-dev',function () {
    return gulp.src([
        'src/js/plugins/*.js',
        'src/js/core/*.js'
        ])
        .pipe(concat('plugins.js'))//合并后的文件名
        .pipe(gulp.dest('src/assets/js'));
});

gulp.task('jsconcat-plugin-dev',function () {
    return gulp.src([
        'src/js/vendor/*.js'
        ])
        .pipe(concat('vendor.js'))//合并后的文件名
        .pipe(gulp.dest('src/assets/js'));
});


gulp.task('jsmin',function () {
    return gulp.src('output/*.js')
<<<<<<< HEAD
<<<<<<< HEAD
        //.pipe(stripDebug())
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
        .pipe(uglify())
        .pipe(gulp.dest('output/'))
});

// gulp.task('jsRev', function () {
//     return gulp.src('output/js/*.js')
//         .pipe(rev())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(rev.manifest({
//             base: 'dist/css',
//             merge: true // merge with the existing manifest (if one exists)
//         }))
//         .pipe(gulp.dest('output/rev'));
// });


gulp.task('cssmin', function () {
    return gulp.src('output/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('output/'))
});

gulp.task('cssconcat',function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('base.css'))//合并后的文件名
        .pipe(gulp.dest('output/'));
});

gulp.task('cssconcat-plugin',function () {
    return gulp.src('src/css/plugins/*.css')
        .pipe(concat('plugin.css'))//合并后的文件名
        .pipe(gulp.dest('output/'));
});

gulp.task('cssconcat-dev',function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('base.css'))//合并后的文件名
        .pipe(gulp.dest('src/assets/css'));
});
gulp.task('cssconcat-dev-plugin',function () {
    return gulp.src('src/css/plugins/*.css')
        .pipe(concat('plugin.css'))//合并后的文件名
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('cssRev', function () {
    return gulp.src(['output/*.css','output/*.js'])
        .pipe(gulp.dest('output/'))
        .pipe(rev())
        .pipe(gulp.dest('output/assets'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('output/rev'));
});

gulp.task('movejs', function(){
  return gulp.src('output/assets/*.js')
  .pipe(gulp.dest('dist/assets/js/'));
});

gulp.task('movecss', function(){
  return gulp.src('output/assets/*.css')
  .pipe(gulp.dest('dist/assets/css/'));
});

<<<<<<< HEAD
<<<<<<< HEAD
// gulp.task("es6", function () {
//     return gulp.src("src/assets/js/**/*.*")
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest("src/assets/js/"));
// });

=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827


gulp.task('htmlmin', function () {
    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('dist/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

// gulp.task('rev',function(){
//     gulp.src('src/*.html')
//         .pipe(rev())
//         .pipe(gulp.dest('dist/'));
       
// })

gulp.task('rev', function () {
    gulp.src(['output/rev/*.json','src/*.html'])
        .pipe( revCollector({
            
            
        }) )
        .pipe( gulp.dest('dist/') );
});

gulp.task('less', function () {
    return gulp.src(['src/less/*.less','src/less/_modules/*.less'])
<<<<<<< HEAD
<<<<<<< HEAD
        //错误提示
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        //.on('error', handleError)
        .pipe(gulp.dest('src/css'));
});

/*function handleError(err) {
=======
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
        .pipe(less())
        .on('error', handleError)
        .pipe(gulp.dest('src/css'));
});

function handleError(err) {
<<<<<<< HEAD
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
  if (err.message) {
    console.log(err.message)
  } else {
    console.log(err)
  }
  this.emit('end')
<<<<<<< HEAD
<<<<<<< HEAD
}*/
=======
}
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
}
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827


var filesToMove = [
    'src/images/**/*.*'
];

gulp.task('dist', function () {
    return gulp.src(filesToMove)
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('dist-dev', function () {
    return gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('src/assets/images'));
});

gulp.task('dist-js-dev', function () {
    return gulp.src('src/js/page/*.*')
        .pipe(gulp.dest('src/assets/js/page/'));
});

gulp.task('move-page-js', function () {
    return gulp.src('src/js/page/*.*')
<<<<<<< HEAD
<<<<<<< HEAD
        //.pipe(stripDebug())
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/page/'))
});

gulp.task('replace', function(){
    return gulp.src('dist/*.html')
        .pipe(replace('src="images/','src="assets/images/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('replace-sec', function(){
    return gulp.src('dist/*.html')
        .pipe(replace('src="./images/','src="assets/images/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('distres', function () {
    return gulp.src('src/resources/**.*')
        .pipe(gulp.dest('dist/resources'))
});

gulp.task('AutoFx', function () {
    return gulp.src('dist/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});

//reload server
// gulp.task('reload-dev',function() {
//   return gulp.src(['src/images/**/*.*',
//                 'src/js/**/*.*',
//                 'src/less/**/*.*',
//                 'src/resources/**/*.*',
//                 'src/*.html'
//         ])
//     .pipe(reload);
// });

// gulp.task('connectDev', function() {
//   connect.server({
//     root: 'src',
//     port: 8000,
//     livereload: true
//   });
// });

gulp.task('connectDev', function() {
    browserSync.init({
        server: "src",   //服务器根目录
<<<<<<< HEAD
<<<<<<< HEAD
        port: 8000
=======
        port: 8000,
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
        port: 8000,
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
    });
    gulp.watch(['src/images/**/*.*',
                'src/js/**/*.*',
                'src/less/**/*.*',
                'src/resources/**/*.*',
                'src/*.html'
        ],['dev-re', reload]);
});

gulp.task('connectDev-less', function() {
    browserSync.init({
        server: "src",   //服务器根目录
<<<<<<< HEAD
<<<<<<< HEAD
        port: 8000
=======
        port: 8000,
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
        port: 8000,
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
    });
    gulp.watch(['src/images/**/*.*',
                'src/js/**/*.*',
                'src/less/**/*.*',
                'src/resources/**/*.*',
                'src/*.html'
        ],['dev-re-less', reload]);
});

//gulp.task('build', ['clean','jsconcat','jsmin']);

<<<<<<< HEAD
<<<<<<< HEAD
gulp.task('build', gulpSequence('clean','jsconcat','jsconcat-plugin','jsmin','cssconcat','cssconcat-plugin','cssmin','cssRev','movejs','movecss','AutoFx',['dist','distres','rev'],'htmlmin','replace','replace-sec','move-page-js','imgMin'));
=======
gulp.task('build', gulpSequence('clean','jsconcat','jsconcat-plugin','jsmin','cssconcat','cssconcat-plugin','cssmin','cssRev','movejs','movecss','AutoFx',['dist','distres','rev'],'htmlmin','replace','replace-sec','move-page-js'));
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
gulp.task('build', gulpSequence('clean','jsconcat','jsconcat-plugin','jsmin','cssconcat','cssconcat-plugin','cssmin','cssRev','movejs','movecss','AutoFx',['dist','distres','rev'],'htmlmin','replace','replace-sec','move-page-js'));
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

//gulp.task('dev', ['connectDev', 'watch','less']);

// gulp.task('dev', gulpSequence('clean','jsconcat','cssconcat','cssRev',['dist','rev'],'connectDev', 'watch'));

gulp.task('dev-re',function(callback){
     gulpSequence('less','jsconcat-dev','jsconcat-plugin','cssconcat-dev','cssconcat-dev-plugin','dist-dev','dist-js-dev')(callback);
<<<<<<< HEAD
<<<<<<< HEAD
});

gulp.task('dev-re-less',function(callback){
     gulpSequence('less','jsconcat-dev','jsconcat-plugin','cssconcat-dev','dist-dev')(callback);
});
=======
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
})

gulp.task('dev-re-less',function(callback){
     gulpSequence('less','jsconcat-dev','jsconcat-plugin','cssconcat-dev','dist-dev')(callback);
})
<<<<<<< HEAD
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827
=======
>>>>>>> 13e76226d5dbb6a994dc4531a6e414adbe760827

gulp.task('default', ['build']);

// gulp.task('watch', function() {
//     gulp.watch(path.src + '**/*.*',['dev-re','rev','less','reload-dev']);
// });

gulp.task('dev', gulpSequence('connectDev','jsconcat-dev','jsconcat-plugin-dev','cssconcat-dev','dist-dev'));
gulp.task('dev-less', gulpSequence('connectDev-less','less','jsconcat-dev','jsconcat-plugin-dev','cssconcat-dev','dist-dev'));
// gulp.task('watch', function() {
//     gulp.watch(['src/images/**/*.*',
//                 'src/js/**/*.*',
//                 'src/less/**/*.*',
//                 'src/resources/**/*.*',
//                 'src/*.html'
//         ],['reload-dev','dev-re']);
// });
