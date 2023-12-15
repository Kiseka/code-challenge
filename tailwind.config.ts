/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '3xl': {'max': '5536px'},

      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      container: {
        padding: '2rem',
      },
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
        'edge-space': '7rem',
        'edge-space-sm': '2rem',
      },
      colors: {
        'body-bg': '#fafcfd',
        'prim-color':'#0D6EFD',
        'prim-green':"#97f8e4",
        'prim-yellow':"#FCE74C",
        'prim-orange':"#eab308",
        'prim-orange-2':"#f79725",
        'project-blue':"#5F8CA0",

      },
      width:{
        '18': '4.5rem',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px'
      },
      maxWidth: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px'
      },
      minWidth: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px'
      },
      fontFamily: {
        'inter':['Inter','sans-serif'],
        'ubuntu':['Ubuntu','sans-serif'],
        'circular':['Circular','sans-serif'],
        'dm-sans':['DMSANS','sans-serif'],
        'league-spartan':['LeagueSpartan','sans-serif']
      }
    },
  },
  plugins: [
    
  ],
}
