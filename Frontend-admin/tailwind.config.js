/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Minia Primary Palette (Now dynamic via CSS variables)
        primary: {
          DEFAULT: 'var(--color-primary, #5156be)',
          50:  'var(--color-primary-50, #ededf8)',
          100: 'var(--color-primary-100, #d4d5ef)',
          200: 'var(--color-primary-200, #a8aadf)',
          300: 'var(--color-primary-300, #7b7fcd)',
          400: 'var(--color-primary-400, #6368c5)',
          500: 'var(--color-primary, #5156be)',
          600: 'var(--color-primary-600, #4549a8)',
          700: 'var(--color-primary-700, #3a3e96)',
          800: 'var(--color-primary-800, #2e3278)',
          900: 'var(--color-primary-900, #21235a)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #3498DB)',
          50:  'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        success: {
          DEFAULT: '#2ab57d',
          50:  '#e8f8f1',
          100: '#d4f4e7',
          200: '#a3e6cb',
          300: '#5dd4a5',
          400: '#2ab57d',
          500: '#2ab57d',
          600: '#229963',
          700: '#1d8a5e',
          800: '#166d49',
          900: '#105435',
        },
        info: {
          DEFAULT: '#4ba6ef',
          50:  '#edf6fe',
          100: '#d6edfb',
          200: '#a9d9f7',
          300: '#7cc5f3',
          400: '#4ba6ef',
          500: '#4ba6ef',
          600: '#2d8ad5',
          700: '#1f6eb0',
          800: '#155289',
          900: '#0e3a62',
        },
        warning: {
          DEFAULT: '#ffbf53',
          50:  '#fff8ea',
          100: '#fff0d6',
          200: '#ffe0a8',
          300: '#ffd07a',
          400: '#ffbf53',
          500: '#ffbf53',
          600: '#e0a230',
          700: '#b88320',
          800: '#8f6515',
          900: '#66480e',
        },
        danger: {
          DEFAULT: '#fd625e',
          50:  '#ffeeed',
          100: '#fed9d8',
          200: '#feb3b1',
          300: '#fd8d8a',
          400: '#fd625e',
          500: '#fd625e',
          600: '#d94440',
          700: '#b53030',
          800: '#8f2222',
          900: '#691818',
        },
        // Layout-specific colors
        sidebar: {
          DEFAULT: '#2a3042',
          dark: '#1a1f2f',
          brand: '#5156be',
        },
        topbar: {
          DEFAULT: '#ffffff',
          dark: '#2a3042',
        },
        body: {
          DEFAULT: '#f5f6f8',
          dark: '#1a1a2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],    // 11px
        'xs':  ['0.75rem',   { lineHeight: '1rem' }],    // 12px
        'sm':  ['0.8125rem', { lineHeight: '1.25rem' }], // 13px
        'base':['0.875rem',  { lineHeight: '1.5rem' }],  // 14px
        'md':  ['0.9375rem', { lineHeight: '1.5rem' }],  // 15px
        'lg':  ['1rem',      { lineHeight: '1.5rem' }],  // 16px
        'xl':  ['1.125rem',  { lineHeight: '1.75rem' }], // 18px
        '2xl': ['1.25rem',   { lineHeight: '1.75rem' }], // 20px
        '3xl': ['1.5rem',    { lineHeight: '2rem' }],    // 24px
      },
      boxShadow: {
        'card':     '0 0.75rem 1.5rem rgba(18, 38, 63, 0.03)',
        'card-hover': '0 1rem 2rem rgba(18, 38, 63, 0.08)',
        'dropdown': '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        'topbar':   '0 0.05rem 0.01rem rgba(0, 0, 0, 0.05)',
        'sidebar':  '0 2px 4px rgba(15, 34, 58, 0.12)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        'sidebar': '250px',
        'sidebar-sm': '70px',
        'sidebar-md': '160px',
        'topbar': '70px',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      animation: {
        'fade-in':      'fadeIn 0.3s ease-out',
        'fade-in-up':   'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
        'slide-in-left':  'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in':     'scaleIn 0.2s ease-out',
        'spin-slow':    'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
