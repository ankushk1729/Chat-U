const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens : {
      'mobile': '300px',
      'mobile_l':'400px',
      'mobile_xl':'550px',
      ...defaultTheme.screens
    },
    extend: {
      
      colors: {
          gray:{
            'light':'#d3d3d3',
            DEFAULT:'#f7f9fc',
            'dark':'#808798',
          },
          white:{
            DEFAULT:'#fff'
          },
          blue:{
            'dark':'#20243c',
          },
      },
      height: {
        "10px":"10px",
        "20px":"20px",
        "30px":"30px",
        "40px":"40px",
        "45px":"45px",
        "50px":"50px",
        "60px":"60px",
        "70px":"70px",
        "80px":"80px",
        "90px":"90px",
        "100px":"100px",

				"10vh": "10vh",
				"20vh": "20vh",
				"30vh": "30vh",
				"40vh": "40vh",
				"50vh": "50vh",
				"60vh": "60vh",
				"70vh": "70vh",
				"80vh": "80vh",
				"90vh": "90vh",
        "92vh": "92vh",
				"100vh": "100vh",

        "5%":"5%",
        "10%":"10%",
        "20%":"20%",
        "25%":"25%",
        "28%":"28%",
        "30%":"30%",
        "40%":"40%",
        "50%":"50%",
        "60%":"60%",
        "70%":"70%",
        "72%":"72%",
        "80%":"80%",
        "90%":"90%",
			},
      width: {
        "10px":"10px",
        "20px":"20px",
        "30px":"30px",
        "40px":"40px",
        "45px":"45px",
        "50px":"50px",
        "60px":"60px",
        "70px":"70px",
        "80px":"80px",
        "90px":"90px",
        "100px":"100px",

        "20vw": "20vw",
				"10vw": "10vw",
				"30vw": "30vw",
				"40vw": "40vw",
				"50vw": "50vw",
				"60vw": "60vw",
				"70vw": "70vw",
				"80vw": "80vw",
				"90vw": "90vw",
				"92vw": "92vw",
				"95vw": "95vw",
				"100vw": "100vw",

        "10%":"10%",
        "15%":"15%",
        "20%":"20%",
        "25%":"25%",
        "30%":"30%",
        "35%":"35%",
        "40%":"40%",
        "50%":"50%",
        "60%":"60%",
        "65%":"65%",
        "70%":"70%",
        "80%":"80%",
        "85%":"85%",
        "90%":"90%",
			},
      margin:{
        'N30px':'-30px',
      },
      fontSize:{
        'xxs':'0.5rem',
        '4+xl':'44px'
      }
    },
  },
  variants: {
    extend: {},
  },
  
  plugins: [],
}
