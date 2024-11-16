/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '350px', // Custom xs breakpoint at 480px
      },
      fontFamily: {
        aero: ['AeroFont', 'sans-serif'], // Define a custom font name
      },
      colors: {
        brown: {
          500: '#a52a2a',
        },
        white: {
          500: '#ffffff',
        },
        black: {
          500: '#000000',
        },
        background: 'var(--background)',
        normal: 'var(--normal)',
        fire: 'var(--fire)',
        water: 'var(--water)',
        grass: 'var(--grass)',
        ice: 'var(--ice)',
        electric: 'var(--electric)',
        psychic: 'var(--psychic)',
        fighting: 'var(--fighting)',
        poison: 'var(--poison)',
        ground: 'var(--ground)',
        flying: 'var(--flying)',
        bug: 'var(--bug)',
        rock: 'var(--rock)',
        ghost: 'var(--ghost)',
        steel: 'var(--steel)',
        dragon: 'var(--dragon)',
        dark: 'var(--dark)',
        fairy: 'var(--fairy)',
        default: 'var(--default)',
      },
    },
  },
  plugins: [],
};
