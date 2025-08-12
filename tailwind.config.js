/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myIranSansRegular: ["myIranSans-regular", "sans-serif"],
        myIranSansMedium: ["myIranSans-medium", "sans-serif"],
        myIranSansBold: ["myIranSans-Bold", "sans-serif"],
        myIranSansLight: ["myIranSans-light", "sans-serif"],
        myIranSansUltraLight: ["myIranSans-UltraLight", "sans-serif"],

        myIranSansFaNumRegular: ["myIranSansFaNum-regular", "sans-serif"],
        myIranSansFaNumUltraLight: ["myIranSansFaNum-UltraLight", "sans-serif"],
        myIranSansFaNumLight: ["myIranSansFaNum-Light", "sans-serif"],
        myIranSansFaNumMedium: ["myIranSansFaNum-medium", "sans-serif"],
        myIranSansFaNumBold: ["myIranSansFaNum-Bold", "sans-serif"],

        myYekanRegular: ["myYekan-regular", "sans-serif"],
        myYekanMedium: ["myYekan-medium", "sans-serif"],
        myYekanDemibold: ["myYekan-demibold", "sans-serif"],
        myYekanFaNumRegular : ["myYekanFaNum-regular", "sans-serif"],
        myYekanFaNumMedium : ["myYekanFaNum-medium", "sans-serif"],
        myYekanFaNumDemiBold : ["myYekanFaNum-demiBold", "sans-serif"]

      },

      boxShadow: {
        'custom': '0px 0px 2.89px 0px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        primary: {
          50: "#ECEEF8",
          100: "#C5CBE9",
          200: "#9FA8DA",
          300: "#7985CB",
          400: "#5262BC",
          500: "#3F51B5",
          600: "#3445A3",
          700: "#233087",
          800: "#17216E",
          900: "#131836",
          950: "#060812"
        },
        secondary: {
          50: "#F0EBF8",
          100: "#D1C4E9",
          200: "#B39DDB",
          300: "#9575CD",
          400: "#764EBE",
          500: "#673AB7",
          600: "#5D34A5",
          700: "#482980",
          800: "#341D5C",
          900: "#1F1137",
          950: "#0A0612"
        },
        neutral: {
          50: "#F5F5F5",
          100: "#E2E2E2",
          200: "#CFCFCF",
          300: "#BBBBBB",
          400: "#A8A8A8",
          500: "#9E9E9E",
          600: "#8E8E8E",
          700: "#6F6F6F",
          800: "#4F4F4F",
          900: "#2F2F2F",
          950: "#101010"
        },
        text: {
          50: "#E9E9E9",
          100: "#BCBCBC",
          200: "#909090",
          300: "#646464",
          400: "#373737",
          500: "#212121",
          600: "#1E1E1E",
          700: "#171717",
          800: "#111111",
          900: "#0F0707",
          950: "#030303"
        },
        background: {
          100: "#FCFCFC",
          300: "#FBFBFB",
          500: "#FAFAFA",
          550: "#F6F6F6",
          600: "#E1E1E1",
          700: "#AFAFAF",
          800: "#7D7D7D",
          900: "#4B4B4B",
          950: "#191919",
        },
        success: {
          200: "#CAEBD7",
          500: "#4CAF50",
          800: "#1B691E",
        },
        info: {
          200: "#C7EDFC",
          500: "#2196F3",
          800: "#0C4691",
        },
        error: {
          200: "#FCE0CC",
          300: "#FDD9D7",
          500: "#F44336",
          800: "#941A13",
        },
        warning: {
          200: "#FFEFBF",
          500: "#FF9800",
          800: "#994A00",
        }
      },
      screens: {
        xs: '320px',
        mobile: '390px',   // Mobile: 390px and up
        tablet: '744px',   // Tablet: 744px and up
        desktop: '1440px', // Desktop: 1440px and up
      }
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {

        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "#FBFBFB"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E2E2E2",
            borderRadius: "20px",
            border: "1px solid white"
          },
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

