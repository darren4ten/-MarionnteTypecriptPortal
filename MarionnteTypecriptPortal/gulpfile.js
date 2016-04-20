/////////////////////////////////////////////////////////////////////
// Required Packages

var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var del = require('del');
var dust = require('gulp-dust');
var flatten = require('gulp-flatten');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var spritesmith = require('gulp.spritesmith');
var uglify = require('gulp-uglify');

/////////////////////////////////////////////////////////////////////
// Files Collection

gulp.task('collectBowerLib', ['templates'], function () {
    gulp.src([
        'bower_components/backbone/backbone.js',
        'bower_components/backbone.babysitter/lib/backbone.babysitter.js',
        'bower_components/backbone.marionette/lib/core/backbone.marionette.js',
        'bower_components/backbone.paginator/lib/backbone.paginator.js',
        'bower_components/backbone.validation/dist/backbone-validation.js',
        'bower_components/backbone-nested-model/backbone-nested.js',
        'bower_components/backbone.stickit/backbone.stickit.js',
        'bower_components/backbone.radio/build/backbone.radio.js',
        'bower_components/dustjs-helpers/dist/dust-helpers.js',
        'bower_components/dustjs-linkedin/dist/dust-core.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery.i18n.properties/jquery.i18n.properties.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/perfect-scrollbar/perfect-scrollbar.js',
        'bower_components/tether/dist/js/tether.js',
        'bower_components/underscore/underscore.js',
        'bower_components/requirejs/require.js',
        'bower_components/spinjs/spin.js',
        'bower_components/turnjs/turn.js',
        'bower_components/turnjs/turn.html4.js',
    ])
        .pipe(flatten())
        .pipe(gulp.dest('./js'));
});

gulp.task('collectBowerLibMin', ['templates', 'generateBowerLibMin'], function () {
    gulp.src([
        'bower_components/backbone/backbone-min.js',
        'bower_components/backbone.babysitter/lib/backbone.babysitter.min.js',
        'bower_components/backbone.marionette/lib/core/backbone.marionette.min.js',
        'bower_components/backbone.paginator/lib/backbone.paginator.min.js',
        'bower_components/backbone.validation/dist/backbone-validation-min.js',
        './bower_components/minimized/backbone-nested.min.js',
        './bower_components/minimized/backbone.stickit.min.js',
        'bower_components/backbone.radio/build/backbone.radio.min.js',
        'bower_components/dustjs-helpers/dist/dust-helpers.min.js',
        'bower_components/dustjs-linkedin/dist/dust-core.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery.i18n.properties/jquery.i18n.properties.min.js',
        'bower_components/jquery-ui/jquery-ui.min.js',
        'bower_components/perfect-scrollbar/perfect-scrollbar.min.js',
        'bower_components/tether/dist/js/tether.min.js',
        'bower_components/underscore/underscore-min.js',
        'bower_components/spinjs/spin.min.js',
        'bower_components/turnjs/turn.min.js',
        'bower_components/turnjs/turn.html4.min.js',
        './templates/templatesP.js',
        './ts/appP.js' // Build by require.js
    ])
        .pipe(flatten())
        .pipe(gulp.dest('./js'));
});

/////////////////////////////////////////////////////////////////////
// Javascript 3rd party minification

var uglifyOptions = {
    mangle: true,
    compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: false,
        drop_debugger: true,
        unsafe: true
    }
};

gulp.task('generateBowerLibMin', function () {
    return gulp.src([
        'bower_components/backbone-nested-model/backbone-nested.js',
        'bower_components/backbone.stickit/backbone.stickit.js'
    ])
        .pipe(uglify(uglifyOptions))
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./bower_components/minimized/'));
});

/////////////////////////////////////////////////////////////////////
// Dust Templates

gulp.task("templates", function () {
    return gulp.src('./ts/templates/dust/**/*.html')
        .pipe(rename(function (path) {
            path.basename = path.dirname.replace('\\', '.') + "." + path.basename;
            path.dirname = "";
            path.extname = "";
        }))
        .pipe(dust())
        .pipe(concat('templatesP.js')) // save with a 'P' postfix so it does not overwrite the main portal file
        .pipe(gulp.dest('./templates'));
});

/////////////////////////////////////////////////////////////////////
// Sprite Icons

gulp.task('sprites', function () {
    var spriteData = gulp.src('images/icons/*.png').pipe(spritesmith({
        imgName: 'spritesP.png',
        retinaImgName: 'spritesP2.png', // add retina icons
        retinaSrcFilter: 'images/icons/*@2x.png',
        cssName: 'spritesP.less'
    }));

    var imgStream = spriteData.img
      .pipe(buffer())
      .pipe(gulp.dest('images/'));

    var cssStream = spriteData.css
      .pipe(gulp.dest('css/less/'));

    return merge(imgStream, cssStream);
});

gulp.task('spritesMin', function () {
    var spriteData = gulp.src('images/icons/*.png').pipe(spritesmith({
        imgName: 'spritesP.png',
        retinaImgName: 'spritesP2.png', // add retina icons
        retinaSrcFilter: 'images/icons/*@2x.png',
        cssName: 'spritesP.less'
    }));

    var imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin()) // minimize image size
      .pipe(gulp.dest('images/'));

    var cssStream = spriteData.css
      .pipe(gulp.dest('css/less/'));

    return merge(imgStream, cssStream);
});

/////////////////////////////////////////////////////////////////////
// Stylesheets

// TODO convert LESS to static/css to stylesheetsP.css

gulp.task('collectBowerCss', [], function () {
    gulp.src([
        'bower_components/jquery-ui/themes/base/jquery-ui.css',
        'bower_components/tether/dist/css/tether.css'
    ])
        .pipe(flatten())
        .pipe(gulp.dest('./css'));
});

gulp.task('collectBowerCssMin', [], function () {
    gulp.src([
        'bower_components/jquery-ui/themes/base/jquery-ui.min.css',
        'bower_components/tether/dist/css/tether.min.css'
    ])
        .pipe(flatten())
        .pipe(gulp.dest('./css'));
});

/////////////////////////////////////////////////////////////////////
// Global script command

// Clean before all
gulp.task('Clean', function () {
    del([
        './images/spritesP*.png',
        './css/less/spritesP.less',
        './templates/templatesP.js',
        './bower_components/minimized/*.min.js',
        './js/*.*',
        './css/*.*'
    ]);
});

// Task to execute on Debug build
gulp.task('Debug', ['collectBowerLib', 'collectBowerCss', 'sprites'], function () {
});

// Tasks to execute on Release build
gulp.task('Release', ['collectBowerLibMin', 'collectBowerCssMin', 'spritesMin'], function () {
});

// Task to execute if no build parameter are pass: debug
gulp.task('default', ['Debug'], function () {
});