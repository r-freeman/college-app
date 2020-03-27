const env = process.env.NODE_ENV;

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer'),
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }),
        env === 'production' ? require('@fullhuman/postcss-purgecss')({
            content: [
                './resources/js/**/*.vue'
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }) : false
    ],
    minimize: true
};
