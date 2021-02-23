module.exports = {
  purge: [
    // '*.html'

  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'DOL-theme-primary': '#0b5d66',
        'DOL-theme-darker':'#073d42',
        'nysds-heading':'#24387E',
      },

      fontFamily: {
        'body': ['"Proxima Nova"', 'Arial', 'sans-serif'],
       }

    },
    
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
  plugins: [],
}
