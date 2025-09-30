import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-blue': '#003049',
                red: '#D62828',
                orange: '#F77F00',
                'yellow-orange': '#FCBF49',
                cream: '#EAE2B7',
            }
        },
    },
    plugins: [],
};

export default config;