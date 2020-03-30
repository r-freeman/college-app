const mix = require('laravel-mix');
require('laravel-mix-postcss-config');
require('laravel-mix-alias');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/main.js', 'public/js')
    .postCss('resources/css/tailwind.css', 'public/css/main.css')
    .postCssConfig();

mix.alias({
    '@': '/resources/js'
});

mix.browserSync({
    proxy: 'localhost:8000',
    notify: false
});
