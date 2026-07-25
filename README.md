# Nos Astra

Marketing site for **Nos Astra** — AI consulting and custom software.

Live copy, layout and styling live in `index.html`; the interactive site is a small React app
mounted into it by Vite.

## Stack

- [Vite 6](https://vite.dev) + [React 19](https://react.dev)
- No CSS framework — all styles are hand-written in `index.html`
- Self-hosted fonts (Fraunces) in `public/fonts/`
- Contact form posts to [Formspree](https://formspree.io)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command           | What it does                            |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the Vite dev server                |
| `npm run build`   | Production build into `dist/`            |
| `npm run preview` | Serve the built site locally             |

## Structure

```
index.html      Page shell, all global CSS, and a no-JS fallback copy of the homepage
privacy.html    Standalone privacy policy (GDPR, required by the contact form)
src/main.jsx    The whole React app: routing, homepage sections, service pages, contact form
public/         Images and self-hosted fonts
```

### Routing

The site uses clean, indexable paths handled in `src/main.jsx`:

- `/` — homepage
- `/ai-consulting/`, `/custom-builds/`, `/workflow-automation/` — service pages
- `#contact`, `#services`, `#about` — in-page anchors on the homepage

The production build prerenders each service page to its own `index.html`, including unique
metadata, canonical URLs, structured data, and visible HTML content before React loads.

Route changes run through the View Transitions API: a short cross-fade of the screen, then the
arriving page's content rises into place. Browsers without the API, and anyone who prefers reduced
motion, get an instant swap.

## Deployment

`npm run build` produces a fully static `dist/` — deploy it to any static host.
