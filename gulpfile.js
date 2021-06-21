let project_folder = 'dist';
let source_folder = 'app';

let preprocessor = 'scss';

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/images/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/*.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp');
let gulp = require('gulp'),
fileinclude = require('gulp-file-include'),
group_media = require("gulp-group-css-media-queries"),
rename = require("gulp-rename"),
webp = require("gulp-webp"),
webphtml = require("gulp-webp-html"),
addSource = require('gulp-add-source-picture');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const less         = require('gulp-less');
const scss         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean_css    = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: './' + project_folder + '/' },
        port: 3000,
        notify: false,
        online: true
    })
}

function html() {
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(scss({
            outputStyle: "expanded"
            }))
        .pipe(group_media())
        .pipe(autoprefixer({
            "overrideBrowserslist": [
                "last 5 versions"
            ],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function js() {
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function images() {
    return src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(webp({
        quality: 70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin())
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}


function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browsersync);

exports.images    = images;
exports.js        = js;
exports.css       = css;
exports.html      = html;
exports.build     = build;
exports.watch     = watch;
exports.default   = watch;
