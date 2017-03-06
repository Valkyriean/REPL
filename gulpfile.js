/**
 * Created by David on 27/02/2017.
 */
var gulp=require("gulp");
var inject = require('gulp-inject');
var nodemon=require("gulp-nodemon");

gulp.task("default",["server"]);

gulp.task('watch', function () {
    gulp.watch(['public/**/*.scss','public/**/*.js'], {cwd:'./'},['importscss','injectjs']);
});

gulp.task("server", function () {
    nodemon({
        script:'app.js',
        env:{'NODE_ENV':'development'}
    });
});

gulp.task('inject', function () {
    var target = gulp.src('./public/index.html');
    var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./public'));
});

