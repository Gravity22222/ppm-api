/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // CORREÇÃO: Usamos o nome do novo pacote aqui
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;