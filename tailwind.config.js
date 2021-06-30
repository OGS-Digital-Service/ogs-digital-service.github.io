module.exports = {
  purge: [
    'docs/iconframe/*.html'
    // 'docs/*.html',
    // 'docs/**/*.html'  

  ],
  darkMode: false, // or 'media' onpm init -yr 'class'
  theme: {
    fontFamily: {
      sans: ['Proxima Nova', 'Arial', 'sans-serif']
     },
    extend: {
      colors: {
        'admin-first': '#ac3f14',
        'admin-second': '#cf7954',
        'admin-third': '#f3d3c1',
        'business-first': '#0b5d66',
        'business-second': '#65999e',
        'business-third': '#e5eded',
        'ny-accent-first': '#f4a71c',
        'ny-accent-second': '#f3dd6d',
        'ny-links': '#007ac2',
        'ny-dark': '#62666a',
        'ny-mid': '#d0d0ce',
        'ny-light': '#ededed'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
