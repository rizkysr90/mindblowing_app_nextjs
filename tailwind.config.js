/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs' : '400px',
      'sm' : '640px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px',
      '2xl': '1536px'
    },
    extend: {
        gridTemplateColumns: {
          // added new 4 column grid as new4
          'new4': 'repeat(auto-fit,minmax(300px,1fr))'
        }
       
  },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5363b5",
          "secondary": "#84e06b",
          "accent": "#E6E6E6",
          "neutral": "#302541",
          "base-100": "#FAF9FB",
          "info": "#5CC8E6",
          "success": "#66EAB1",
          "warning": "#F6D36A",
          "error": "#EA5D80",
                    },
      },
    ],
  },
}
