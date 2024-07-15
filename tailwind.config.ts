import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-color': '#243831',
        'secondary-color': '#2B5F44',
        'confirm-color': '#49A569',
        'danger-color': '#F23536',
        'main-gray': '#BBC2C0',
        'gray-f3': '#F3F3F3',
        'gray-4a': '#4A4A4A',
        'gray-300': '#939494',
        'main-black': '#101828'
      },
      fontFamily: {
        'castoro': ['Castoro', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        '28': '28px',
        '24': '24px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;
