# Nos Astra

Marketing site for **Nos Astra** — small software products (StackLight, Welcome Book, Maštograd).

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
src/main.jsx    The whole React app: homepage sections and the contact form
public/         Images and self-hosted fonts
```

### Pages

One page, no router:

- `/` — the homepage, with `#products`, `#about`, and `#contact` in-page anchors
- `/privacy.html` — standalone privacy policy

The product cards link out to each product's own site (`stacklight.nosastra.co`,
`welcomebook.eu`, `mastograd.eu`). The product list lives in one array at the top of
`src/main.jsx`; the same three cards are duplicated in the no-JS fallback in `index.html`,
so update both when a product changes.

## Deployment

`npm run build` produces a fully static `dist/` — deploy it to any static host.
