module.exports = {
  // Paths to all template files in the project
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Secular One"', 'Inter', 'Poppins', 'Heebo', 'Rubik', 'sans-serif'],
        secular: ['"Secular One"', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
      },
    },
  },
  plugins: [],
};
