# Nos Astra

Website for **Nos Astra**, a small software and AI studio in Croatia: [nosastra.co](https://www.nosastra.co).

The site has three audiences: lab teams (`/labs`), AI workshops (which link out to
[thessia.academy](https://www.thessia.academy)), and small businesses (the homepage
services and the Start package). Every page exists in English and Croatian.

## Stack

- [Vite 6](https://vite.dev) + [React 19](https://react.dev)
- No CSS framework. All styles are hand-written in `index.html`
- Self-hosted Fraunces in `public/fonts/`; Manrope from Google Fonts
- Contact and Start forms post to [Formspree](https://formspree.io)
- Vercel Web Analytics and Speed Insights
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the Vite dev server       |
| `npm run build`   | Production build into `dist/`   |
| `npm run preview` | Serve the built site locally    |

## Structure

```
index.html              Page shell, meta tags, all global CSS, and a <noscript> copy of the homepage
privacy.html            English privacy policy (built as a second Vite entry)
public/hr/privacy.html  Croatian privacy policy (static)
src/main.jsx            The whole React app: routing, all copy (`content.en` / `content.hr`), all components
public/                 Images, flags, fonts, sitemap.xml, llms.txt, robots.txt
vercel.json             Redirects for retired URLs, and the SPA rewrite to index.html
```

## Pages

Routing is done by hand in `App()` in `src/main.jsx`, based on `window.location.pathname`.
`vercel.json` rewrites every path to `index.html`.

| English          | Croatian            | Page                                         |
| ---------------- | ------------------- | -------------------------------------------- |
| `/`              | `/hr`               | Homepage: the studio and its three audiences |
| `/labs`          | `/hr/labs`          | AI for labs                                  |
| `/en/start`      | `/start`            | Start, a launch package for new businesses   |
| `/privacy.html`  | `/hr/privacy.html`  | Privacy policy                               |

Note the Start exception: Croatian is the default at `/start` and English lives at
`/en/start` (`/hr/start` redirects to `/start`). Use the `localPath(path, hr)` helper to
build language-aware links. The language flag in the header switches to the same page in
the other language.

`/signal` and `/hr/signal` (a retired product) permanently redirect to `/` and `/hr`.

## Editing content

- Copy lives in the `content` object at the top of `src/main.jsx`, under `en` and `hr`.
  The Croatian copy uses the formal "Vi".
- Page titles and meta descriptions are set per path in the first `useEffect` in `App()`.
- When the homepage changes, update the `<noscript>` copy in `index.html` too.
- When a page is added, add it to `public/sitemap.xml` and `public/llms.txt`.

## Deployment

The site is deployed on Vercel. `npm run build` produces a static `dist/`.
