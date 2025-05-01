/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    'text-highRates',
    'text-lowRates',
    'text-mediumRates'
  ],
  theme: {
    fontWeight: {
      xl: 800,
      md: 600,
      lg: 700,
      sm: 400,
    },
    fontSize: {
      esm:'14px',
      sm:
        '16px',
      md:
        '18px',
      lg:
        '20px',
      xl:
        '24px',
      '2xl':
        '40px',
      '3xl':
        '48px',
      '4xl':
        '64px',
    },

    colors: {
      'mainBackground':
        'rgba(23,23,23,1)',
      'stepperBlack':
        'rgba(42, 42, 42, 1)',
      'mainText':
        {
          DEFAULT: 'rgba(255,255,255,1)',
          700:
            'rgba(255, 255, 255, 0.7)',
          900:
            'rgba(255, 255, 255, 0.9)',
          800:
            'rgba(255, 255, 255, 0.8)',
          500:
            'rgba(255, 255, 255, 0.5)',
          300:
            'rgba(255, 255, 255, 0.3)',
        }
      ,
      'headerBackground':
        'rgba(42,42,42,1)',
      'mainBlue':
        { DEFAULT:'rgba(31, 162, 255, 0.6)',
          300: 'rgba(31, 162, 255, 0.3)'
        },
      'mainBorder':
        'rgba(18, 156, 255, 1)',
      'mainHover':'rgba(18, 156, 255, 1)',
      'highRates':'rgba(31, 162, 255, 1)',
      'mediumRates':'rgba(31, 255, 72, 0.9)',
      'lowRates': 'rgba(255, 31, 35, 0.9)'


// rgba(255, 255, 255, 0.5)
//
// // gjldfk
// rgba(255, 255, 255, 0.7)


    }
    ,
    extend: {
      fontFamily:{
        sans: ["Open Sans", "sans-serif"]
      }
    }
    ,
  },
  plugins: [],
}

