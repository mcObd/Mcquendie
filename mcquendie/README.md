# Mcquendie Portfolio SPA

A modern portfolio single-page application built with React and Vite for Mcquendie Obodos.

## What this project includes

- Full single-page portfolio layout with sections for:
  - Hero
  - About
  - Services
  - Work / Projects
  - Tech stack
  - Contact
  - Privacy Policy
- Responsive navigation
  - desktop nav links
  - mobile hamburger menu
  - footer navigation
- Smooth anchor scrolling for section links
- Visible `Privacy` section linked from nav, mobile menu, and footer
- Tech carousel implemented with `embla-carousel-react`
- Resume download button wired to a local PDF asset
- SEO and social metadata in `index.html`
- Security-focused meta headers and CSP settings
- Google site verification support via meta tag and public asset

## Key project files

- `src/App.jsx` — main React component tree, sections, mobile nav, and privacy policy
- `src/App.css` — app-specific styling, responsive layout, mobile menu, carousel, and privacy styles
- `src/index.css` — base CSS, font import, theme variables, and global utilities
- `vite.config.js` — Vite React plugin configuration
- `package.json` — React + Vite dependencies and scripts
- `vercel.json` — Vercel deployment target for the nested app
- `public/google85c92a4cdf0a7fd1.html` — Google Search Console verification file

## Dependencies

- `react` / `react-dom`
- `@vitejs/plugin-react`
- `embla-carousel`
- `embla-carousel-react`
- `react-icons`
- `@vercel/analytics`

## Development

From the `mcquendie` app folder:

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

This project is configured for Vercel with `vercel.json` targeting the nested `mcquendie` app directory and outputting to `mcquendie/dist`.

## Notes

- The site uses a dedicated `#privacy` section and visible privacy links for transparency.
- The Google verification file is served from `public/` so it can be validated by Search Console.
- Mobile menu transparency was improved so nav text remains readable.
- The `@import` rule for Google Fonts is placed at the top of `src/index.css` to satisfy CSS ordering requirements.
