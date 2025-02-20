import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        around: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInBottom: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        around: "around 0.3s ease-in-out",
        fadeInRight: "fadeInRight 0.5s ease-in-out",
        fadeInBottom: "fadeInBottom 0.5s ease-in-out",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-orange": "linear-gradient(97deg, #FF8243 0%, #FFAE00 100%)",
        "dark-gradient-orange":
          "linear-gradient(97deg, #DA7135 0%, #DB9403 100%)",
        "gradient-green": "linear-gradient(97deg, #2B927F 0%, #74BA74 100%)",
        "dark-gradient-green":
          "linear-gradient(97deg, #267665 0%, #5A935D 100%)",
        // "hero-background": "url('/src/assets/Hero.png')",
      },
      fontFamily: {
        quicksand: ["var(--font-quicksand)", "sans-serif"], // Use the CSS variable
        poppins: ["var(--font-poppins)", "sans-serif"],
        notoSans: ["var(--font-quicksand)", "sans-serif"],
      },
      boxShadow: {
        shadowBtn: "0px 2px 4px 0px rgb(0 0 0 / 0.25)",
        shadowComp: "0px 0px 20px 0px rgb(0 0 0 / 0.4)",
        none: "0px 0px 0px 0px",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primaryColor: "#FF8243",
        secondColor: "#74ba74",
        thirdColor: "#2B927F",
        textColor: "#2c2c2c",
        textColor2: "#6A6A6A",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }: any) => {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          scrollbarColor: "white white",
          // display: "none",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "16px",
            // height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
            borderRadius: "20px",
            // margin: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#FF8243",
            borderRadius: "100vw",
            border: "1px solid white",
            minHeight: "20px",
          },
          "&:hover": {
            // visibility: "visible",
            scrollbarColor: "#2B927F white",
            "scrollbar-width": "thin",
          },
        },
        ".scrollbar-webkit-orange": {
          "&::-webkit-scrollbar": {
            width: "16px",
            // height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
            borderRadius: "20px",
            // margin: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#FF8243",
            borderRadius: "100vw",
            border: "1px solid white",
            minHeight: "20px",
          },
          "&:hover": {
            // visibility: "visible",
            scrollbarColor: "#FF8243 white",
            "scrollbar-width": "thin",
          },
        },
        /* Chrome, Safari and Opera */
        ".scrollbar-hidden::-webkit-scrollbar": {
          // display: "none",
          visibility: "hidden",
        },
        ".scrollbar-hidden": {
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
export default config;
