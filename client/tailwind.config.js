/** @type {import('tailwindcss').Config} */
// If your client/package.json has no "type": "module", change `export default` to `module.exports =`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'], display: ['"Outfit"', 'sans-serif'] },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(250, 204, 21, 0.6)' }, '50%': { boxShadow: '0 0 0 12px rgba(250, 204, 21, 0)' } },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 3s infinite linear',
        marquee: 'marquee 30s linear infinite',
        'pulse-glow': 'pulseGlow 2.2s infinite',
      },
    },
  },
  plugins: [],
};
