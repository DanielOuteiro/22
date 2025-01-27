import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: '#f5f5f5',
  			secondary: '#d4d4d4',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			tertiary: '#a3a3a3',
  			'bg-primary': '#0d0d0d',
  			'bg-secondary': '#171717',
  			'bg-tertiary': '#262626',
  			'bg-quaternary': '#313131',
  			'bg-button': '#313131',
  			'border-primary': 'hsla(0, 0%, 100%, 0.12)',
  			'border-secondary': 'hsla(0, 0%, 100%, 0.08)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'grid-pattern': ',',
  			'grid-pattern-light': '
  		},
  		boxShadow: {
  			toast: '0px 32px 64px -16px rgba(0,0,0,0.30), 0px 16px 32px -8px rgba(0,0,0,0.30), 0px 8px 16px -4px rgba(0,0,0,0.24), 0px 4px 8px -2px rgba(0,0,0,0.24), 0px -8px 16px -1px rgba(0,0,0,0.16), 0px 2px 4px -1px rgba(0,0,0,0.24), 0px 0px 0px 1px rgba(0,0,0,1.00), inset 0px 0px 0px 1px rgba(255,255,255,0.08), inset 0px 1px 0px 0px rgba(255,255,255,0.20)',
  			button: '0px -1px 0px 0px hsla(0, 0%, 100%, 0.04), 0px 0px 0px 1px hsla(0, 0%, 100%, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 2px 0px rgba(0, 0, 0, 0.04), 0px 4px 2px 0px rgba(0, 0, 0, 0.04), 0px 6px 3px 0px rgba(0, 0, 0, 0.04)'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		},
  		animation: {
  			'background-gradient': 'background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite'
  		},
  		keyframes: {
  			'background-gradient': {
  				'0%, 100%': {
  					transform: 'translate(0, 0)',
  					animationDelay: 'var(--background-gradient-delay, 0s)'
  				},
  				'20%': {
  					transform: 'translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))'
  				},
  				'40%': {
  					transform: 'translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))'
  				},
  				'60%': {
  					transform: 'translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))'
  				},
  				'80%': {
  					transform: 'translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))'
  				}
  			}
  		},
  		darkMode: 'class',
  		maskImage: {
  			'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
