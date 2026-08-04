import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#C17B5E',
        sage: '#5F7D6B',
        charcoal: '#2C2C2C',
        cream: '#F9F6F0',
      },
    },
  },
  plugins: [],
}
export default config
