/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
            'max-468-820': {'min': '468px', 'max': '820px'}, // Custom range
          },
      },
    },
    plugins: [],
  };
  