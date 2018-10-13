//创建一个webserver 
//编译sass  
//基于CommonJS模块化（webpack-stream插件）
//Mock数据
const gulp = require("gulp");
const server = require("gulp-webserver")
const sass = require("gulp-sass")
const webpack = require("webpack-stream")
const watch = require('gulp-watch')
const proxy = require('http-proxy-middleware')
//commonJS规范做JS模块化
gulp.task("packjs",()=>{
    return gulp.src("./src/scripts/**/*.js")
        .pipe(webpack({
            mode:"development",
            entry:{
                app:["@babel/polyfill", "./src/scripts/app.js"]
            },
            output:{
                filename:"app.js"
            },
            module:{
                rules:[
                    {
                        test:/\.html$/,
                        use:["string-loader"]
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            //解析ES6
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest("./dev/scripts"))
})
//启动web-server，应用的插件是gulp-webserver
gulp.task("server",()=>{
    return gulp.src("./dev")
        .pipe(server({
            host:"localhost",
            port:8888,
            livereload:true,
            //中间件
            middleware:[
                proxy("/api",{
                    //公网资源
                    target:"http://localhost:3000",
                    //是否第三方
                    changeOrigin:true,
                    // pathRewrite:{
                    //     "^/api":""
                    // }
                })
            ]
        }))
})

//编译sass
gulp.task("packscss",()=>{
    return gulp.src("./src/styles/app.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("./dev/styles"))
})

//copy  html
gulp.task("copyhtml",()=>{
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dev/"))
})
//copy  libs
gulp.task("copylibs",()=>{
    return gulp.src("./src/libs/**/*")
        .pipe(gulp.dest("./dev/libs"))
})

//copy iconfonts
gulp.task('copyicons', () => {
    return gulp.src('./src/iconfonts/**/*')
      .pipe(gulp.dest('./dev/iconfonts'))
})

//copy mock
gulp.task('copymock', () => {
    return gulp.src('./src/mock/**/*')
      .pipe(gulp.dest('./dev/mock'))
})

//文件修改监听
gulp.task("watch",()=>{
    gulp.watch("./src/*.html",["copyhtml"])
    
    //gulp.watch某些操作系统不支持
    watch("./src/styles/**/*",()=>{
        gulp.start(["packscss"])
    })
    watch("./src/libs/**/*",()=>{
        gulp.start(["copylibs"])
    })
    // watch("./src/mock/**/*",()=>{
    //     gulp.start(["copymock"])
    // })
    // gulp.watch("./src/styles/**/*",["packscss"])
    gulp.watch("./src/scripts/**/*",["packjs"])

})

//??????
gulp.task('default', ['packscss', 'copylibs','packjs', 'copyhtml', 'copyicons', 'server', 'watch'], () => {
    console.log('all works!')
})
