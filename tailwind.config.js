const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                whitesmoke: '#F4F5F7',
                iris: '#5142C9',
                bluegem: '#44359A',
                tropicalblue: '#CCDBFD'
            }
        }
    },
    plugins: [
        require('@tailwindcss/ui')
    ]
};
