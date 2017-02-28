/**
 * Created by David on 27/02/2017.
 */
var gulp=require("gulp");
var nodemon=require("gulp-nodemon");

gulp.task("default",["server"]);

gulp.task("server",function () {
    nodemon({
        script:'app.js',
        env:{'NODE_ENV':'development'}
    });
});
