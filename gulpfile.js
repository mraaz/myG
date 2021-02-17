const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const reload = browserSync.reload
var exec = require('child_process').exec

function styles() {
  return gulp
    .src('resources/assets/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['defaults', 'not IE 11', 'maintained node versions'],
      })
    )
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
}

exports.styles = styles

// browser-sync
function server(done) {
  browserSync.init({
    proxy: {
      target: 'localhost:3333', // can be [virtual host, sub-directory, localhost with port]
      ws: false, // enables websockets
    },
    notify: false,
    open: false, //change this to true if you want the broser to open automatically
    serveStatic: ['.', './public'],
  })
  done()
}

function webpack(cb) {
  return exec('webpack', function(err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
    cb(err)
  })
}
exports.webpack = webpack

/**************** watch task ****************/

function watch(done) {
  gulp.watch('./resources/assets/sass/**/*', gulp.series('styles'))
  //gulp.watch('./resources/assets/js/**/*', gulp.series('webpack'))
  //gulp.watch('./public/**/*').on('change', reload)
  //gulp.watch('./public/*').on('change', reload)
  //gulp.watch('!public/js/**/.#*js').on('change', reload)
  gulp.watch('!public/css/**/.#*css').on('change', reload)
  gulp.watch('./resources/views/*').on('change', reload)
  gulp.watch('./resources/views/**').on('change', reload)
  gulp.watch('./resources/assets/sass/pages/*').on('change', reload)
  gulp.watch('./resources/assets/sass/pages/**').on('change', reload)
  //gulp.watch('./resources/**').on('change', reload)
  gulp.watch('./resources/assets/sass/auth/*').on('change', reload)
  gulp.watch('./resources/views/auth/*').on('change', reload)

  done()
}

/**************** default task ****************/

exports.default = gulp.series(exports.styles, watch, server, webpack)
