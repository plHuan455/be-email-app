const { task, src, dest, series } = require('gulp');
const inlinesource = require('gulp-inline-source');
const inlineFonts = require('gulp-inline-fonts');
const replace = require('gulp-replace');

task('fonts', () => {
  return src(['./build/static/media/*'])
    .pipe(inlineFonts({ name: 'ibenefit' }))
    .pipe(dest('./build/static/css/'));
});

task('inline', () => {
  return src('./build/index.html')
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet"', 'rel="stylesheet" inline'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ['png'],
      }),
    )
    .pipe(dest('./dist'));
});

const font = task('fonts');
const inline = task('inline');

exports.default = series(font, inline);
