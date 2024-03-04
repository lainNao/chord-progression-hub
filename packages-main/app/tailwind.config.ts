import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // NOTE: 拡張しているものがわかりやすくするため、appのようなprefixをつけたキャメルケースのキーにする
    extend: {
      colors: {
        appMain: {
          top: "hsl(var(--colorAppMainTop) / <alpha-value>)",
          bottom: "hsl(var(--colorAppMainBottom) / <alpha-value>)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
