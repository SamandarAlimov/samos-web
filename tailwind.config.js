module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Tailwind sinflarini qidirish yo‘llari
    ],
    darkMode: 'class', // Dark mode uchun 'class' strategiyasi
    theme: {
      extend: {
        colors: {
          primary: '#3b82f6', // Ko‘k
          secondary: '#9333ea', // Binafsha
          accent: '#f43f5e', // Qizil
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };