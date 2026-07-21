# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend Mentor challenge: "Newsletter sign-up form with success message". A static frontend project built with Vite, SCSS, and vanilla JavaScript. Features a responsive form with email validation and a success confirmation state. See [AGENTS.md](AGENTS.md) for the mentoring approach tailored for junior-level developers.

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code (Prettier)
npm run format

# Check formatting
npm run format:check

# Lint SCSS
npm run lint:scss

# Fix SCSS linting issues
npm run lint:scss:fix

# Validate HTML
npm run lint:html

# Optimize images (generates WebP/AVIF)
npm run images

# EditorConfig check
npm run editorconfig
```

Pre-commit hooks (Husky + lint-staged) automatically run formatting and linting on staged files.

## Architecture

### SCSS Module System

SCSS uses modern `@use`/`@forward` pattern with modular directory structure:

- **abstracts/** – Variables (`_variables.scss`), mixins (`_mixins.scss`), functions (`_functions.scss`), placeholders (`_placeholders.scss`)
- **vendors/** – Third-party CSS (normalize reset)
- **base/** – Reset (`_reset.scss`), base styles (`_base.scss`), typography (`_typography.scss`), utilities (`_utilities.scss`), fonts (`_fonts.scss`)
- **layout/** – Page structure (`_main.scss`), grid system
- **components/** – Reusable UI components (buttons, cards, forms)
- **pages/** – Page-specific styles
- **themes/** – Theme variations

Each directory has an `_index.scss` that forwards its partials. `main.scss` imports them in order: abstracts → vendors → base → layout → components → pages → themes.

### Design Tokens

CSS custom properties are defined in [`src/scss/abstracts/_variables.scss`](src/scss/abstracts/_variables.scss) and mapped from SCSS variables. Use these for consistent theming.

### Stylelint Conventions

Property ordering is enforced (linting warning): layout → box-model → flex → grid → visual → typography → interaction. See [`stylelint.config.js`](stylelint.config.js).

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

Vanilla JavaScript expected at `src/js/main.js` (not yet created). Connect via `<script type="module" src="/src/js/main.js">` if adding interactivity for:

- Email validation on form submission
- Switching between sign-up and success states
- Error message display

## Teaching Philosophy

See [AGENTS.md](AGENTS.md) for mentoring approach:

- Explain with "why" attached
- Guided discovery through hint progression
- Encourage debugging techniques and DevTools usage
- Never provide complete copy-paste solutions
