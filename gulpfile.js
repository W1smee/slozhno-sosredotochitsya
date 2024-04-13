const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
  const plugins = [
    autoprefixer(),
    mediaquery()
  ];
  return gulp.src('src/styles/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function scripts() {
  return gulp.src('src/scripts/**/*.js')
            .pipe(gulp.dest('dist/scripts'))
            .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{css,woff}')
              .pipe(gulp.dest('dist/fonts'))
              .pipe(browserSync.reload({stream: true}));
              
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/styles/**/*.css'], css);
  gulp.watch(['src/scripts/**/*.js'], scripts);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, scripts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.fonts = fonts;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;