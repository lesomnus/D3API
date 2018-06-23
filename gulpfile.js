var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var muerge = require('merge2');
var mocha = require('gulp-mocha');


gulp.task('test-clean', () => gulp
    .src('./test/build/*', { read: false })
    .pipe(clean())
);

gulp.task('test-build', ['test-clean'], () => {
    var tsProject = ts
        .createProject('tsconfig.test.json', {
            'declaration': true
        });
    var tsResult = tsProject.src()
        .pipe(tsProject());
        
    return muerge([
        tsResult.js.pipe(gulp.dest('./test/build/*')),
        tsResult.dts.pipe(gulp.dest('./test/build/*'))
    ]);
});

gulp.task('test-only', ()=> gulp
    .src('test/*.spec.ts', {read: false})
    .pipe(mocha({
        reporter: 'nyan',
        require: ['ts-node/register'],
        timeout: (process.env.TEST_DEEP ? 10 : 5 ) * 1000
    }))
);
gulp.task('test-deep-only', ()=>{
    process.env.TEST_DEEP = true;
    gulp.run('test-only');
});

gulp.task('test', ['test-build'], ()=> gulp
    .src('test/*.spec.ts')
    .pipe(mocha({
        reporter: 'nyan',
        require: ['ts-node/register']
    }))
);
gulp.task('test-deep', ()=>{
    process.env.TEST_DEEP = true;
    gulp.run('test');
});

gulp.task('dist-clean', () => gulp
    .src('dist/*', { read: false })
    .pipe(clean())
);

gulp.task('dist-build', ['dist-clean'], () => {
    var tsProject = ts
        .createProject('tsconfig.json', {
            'declaration': true
        });
    var tsResult = tsProject.src()
        .pipe(tsProject());
    
    return muerge([
        tsResult.js.pipe(gulp.dest('dist')),
        tsResult.dts.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('dist', ['test', 'dist-clean', 'dist-build']);

gulp.task('default', ['dist']);
