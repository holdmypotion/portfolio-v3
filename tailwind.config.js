/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        custom: {
          // Dynamic colors that change with theme
          bg: 'var(--theme-bg, #101116)',
          fg: 'var(--theme-fg, #00d4b1)',
          'dark-bg': 'var(--theme-dark-bg, #0c0c11)',
          'bright-fg': 'var(--theme-bright-fg, #00ffd5)',
          comment: 'var(--theme-comment, #6766b3)',
          selection: 'var(--theme-selection, #311b92)',
          string: 'var(--theme-string, #76c1ff)',
          number: 'var(--theme-number, #fffc58)',
          keyword: 'var(--theme-keyword, #d57bff)',
          func: 'var(--theme-func, #00b0ff)',
          operator: 'var(--theme-operator, #00b0ff)',
          type: 'var(--theme-type, #00FF9C)',
          variable: 'var(--theme-variable, #b4baff)',
          error: 'var(--theme-error, #FF5370)',
          warning: 'var(--theme-warning, #e5ff00)',
          info: 'var(--theme-info, #00a589)',
          hint: 'var(--theme-hint, #cc00ff)',
          'line-nr': 'var(--theme-line-nr, #b2d101)',
          'line-nr-active': 'var(--theme-line-nr-active, #d9ff00)',
          'git-add': 'var(--theme-git-add, #00ff40)',
          'git-change': 'var(--theme-git-change, #3700ff)',
          'git-delete': 'var(--theme-git-delete, #6200ff)',
          border: 'var(--theme-border, #00d4b1)',
          visual: 'var(--theme-visual, #311b92)',
          'cursor-line': 'var(--theme-cursor-line, #1f1d4d)',
          special: 'var(--theme-special, #ff5680)',
          'soft-white': 'var(--theme-soft-white, #e8e8e8)',
        },
      },
    },
  },
  plugins: [],
};
