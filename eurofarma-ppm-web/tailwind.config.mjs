/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': {
            light: '#337ab7',
            DEFAULT: '#005a9c', // Nosso Azul principal
            dark: '#004070',
          },
          'secondary': {
            light: '#6ad2cc',
            DEFAULT: '#5dc1b9', // O Verde Água que você especificou
            dark: '#4dab9a',
          },
          'accent': {
            light: '#a488e0',
            DEFAULT: '#8a63d2', // Um tom de Lilás elegante
            dark: '#704db8',
          },
        },
      },
    },
    plugins: [],
  };
  
  export default config;