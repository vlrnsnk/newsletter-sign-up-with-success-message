# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend Mentor challenge: "Newsletter sign-up form with success message". A static frontend project built with Vite, SCSS, and vanilla JavaScript. Features a responsive form with email validation and a success confirmation state.

## Development Commands

```bash
# Start dev server (opens browser at localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Lint SCSS
npm run lint:scss

# Fix SCSS linting issues
npm run lint:scss:fix

# Validate HTML
npm run lint:html

# Fix HTML validation issues
npm run lint:html:fix

# Optimize images (generates WebP/AVIF)
npm run images

# Check EditorConfig compliance
npm run editorconfig
```

Pre-commit hooks (Husky + lint-staged) automatically run formatting and linting on staged files.

## Architecture

### SCSS Module System

Modern `@use`/`@forward` pattern with modular directory structure:

- **abstracts/** – Variables (`_variables.scss`), mixins (`_mixins.scss`), functions (`_functions.scss`), placeholders (`_placeholders.scss`)
- **vendors/** – Third-party CSS (normalize reset)
- **base/** – Reset, base styles, typography, utilities, fonts
- **layout/** – Page structure (`_main.scss`), grid system
- **components/** – Reusable UI components (buttons, cards, forms)
- **pages/** – Page-specific styles
- **themes/** – Theme variations

Each directory has an `_index.scss` that forwards its partials. `main.scss` imports in order: abstracts → vendors → base → layout → components → pages → themes.

### Design Tokens

CSS custom properties defined in `src/scss/abstracts/_variables.scss` and mapped from SCSS variables. Use these for consistent theming.

### Stylelint Conventions

Property ordering enforced (linting warning): layout → box-model → flex → grid → visual → typography → interaction. See `stylelint.config.js`.

### Assets

- `src/assets/images/` – Source SVGs for illustrations and icons
- `src/assets/fonts/` – Custom font files
- `public/` – Static assets (favicons, manifest, robots.txt)

Run `npm run images` to generate WebP/AVIF versions. Use `<picture>` with AVIF → WebP → original fallback for modern image delivery.

### HTML Structure

Single `index.html` at project root with:

- Sign-up form with email input and submit button
- Success state (hidden initially, shown via JavaScript)
- Semantic HTML with accessible form patterns

### JavaScript

Vanilla JavaScript expected at `src/js/main.js` (not yet created). Connect via `<script type="module" src="/src/js/main.js">` for:

- Email validation on form submission
- Switching between sign-up and success states
- Error message display

### Vite Configuration

`vite.config.js` sets:

- Base path: `/newsletter-sign-up-with-success-message/` in production, `/` in dev
- Dev server: port 5173, auto-open, strict port
- Build: outputs to `dist/`, empties directory first

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to main. Builds with Node 24, caches npm dependencies.

## Key Files Reference

- `package.json` – Scripts, dependencies, lint-staged config
- `vite.config.js` – Vite configuration
- `src/scss/main.scss` – Main SCSS entry point
- `src/scss/abstracts/_variables.scss` – Design tokens
- `index.html` – Main HTML entry
- `scripts/optimize-images.js` – Sharp image optimization script
- `.github/workflows/deploy.yml` – GitHub Pages deployment
- `stylelint.config.js` – Stylelint configuration
- `.htmlvalidate.json` – HTML validation config

## Git

- Main branch: `main`
- Pre-commit hooks enforced via Husky
- Commit messages follow conventional commits
