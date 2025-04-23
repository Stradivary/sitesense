import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'poppins': ['Poppins'],
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.png')",
        'hero-cta': "linear-gradient(79.31deg, #CD0A45 62.91%, #FD2B77 101.75%)",
        'hero-hightlight': "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 37, 0.5) 0%, rgba(255, 0, 37, 0) 100%)",
        'rounded-navy': "radial-gradient(50% 50% at 50% 50%, #0E336C 0%, #001A41 100%)",
        'rounded-color': "radial-gradient(50% 50% at 50% 50%, rgba(0, 101, 255, 0.25) 0%, rgba(255, 136, 138, 0.186) 50%, rgba(255, 255, 255, 0) 100%)",
        'feature-gradient': "radial-gradient(50% 50% at 50% 50%, #0067FF 0%, rgba(0, 138, 255, 0.24) 64.5%, rgba(1, 26, 65, 0) 100%)",
        'shared-gradient': "linear-gradient(330.95deg, #001028 35.29%, #0E336C 86.66%)",
        'custom-gradient': 'linear-gradient(81.8deg, #001A41 24.95%, rgba(255, 0, 37, 0.9) 106.85%)',
      },
      dropShadow: {
        'navy': '0px -1px 30px rgba(19, 110, 247, 0.8)',
        'dark': '0px -1px 30px  rgba(0, 26, 65, 0.1)',
      },
      boxShadow: {
        'white': '0px 10px 10px -5px rgba(255, 255, 255, 0.08)',
      },
      container: {
        center: true,
      },
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
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
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
        gradients: "linear-gradient(79.31deg, #CD0A45 62.91%, #FD2B77 101.75%)",
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 2px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
