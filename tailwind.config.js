/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure premium black and deep grays
        base: {
          900: '#000000', // Pure black background
          800: '#09090b', // Deep zinc for subtle contrast
          text: '#ffffff', // Stark white for readability
          muted: '#a1a1aa', // Zinc-400 for secondary text
        },
        // Premium Cyan palette
        cyan: {
          glow: '#00F0FF', 
          light: '#70FFFF',
          muted: '#0891b2', // Cyan-600
        },
        // Stealth dark glass
        glass: {
          DEFAULT: 'rgba(20, 20, 20, 0.6)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.15)',
      },
      backgroundImage: {
        // Dark stealth gradient
        'glass-gradient': 'linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(9, 9, 11, 0.4) 100%)',
      }
    },
  },
  plugins: [],
}