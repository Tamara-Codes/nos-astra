import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Link previews (X, LinkedIn, Slack, WhatsApp) read the HTML without running JavaScript,
// so every route would otherwise show the homepage card. After the build this writes a copy
// of index.html per shareable route with that page's own title, description and image.
// Vercel serves these files before the SPA rewrite. Keep the copy in step with src/main.jsx.
const SITE = "https://www.nosastra.co";
const SHARE_PAGES = [
  { path: "/labs", lang: "en", locale: "en_GB", image: "og-labs.jpg", alternates: ["/labs", "/hr/labs"],
    title: "AI for labs — Nos Astra", imageAlt: "AI and automation for lab teams, with an illustrated 96-well plate",
    description: "AI training, automations for lab data, literature and reports, and small custom tools for lab and life-science teams. Book a free 20-minute Lab AI Check." },
  { path: "/hr/labs", lang: "hr", locale: "hr_HR", image: "og-labs-hr.jpg", alternates: ["/labs", "/hr/labs"],
    title: "AI za laboratorije — Nos Astra", imageAlt: "AI i automatizacija za laboratorijske timove, uz ilustraciju mikrotitarske pločice",
    description: "AI edukacija, automatizacija laboratorijskih podataka, literature i izvještaja te mali prilagođeni alati za laboratorijske timove. Rezervirajte besplatnu Lab AI provjeru od 20 minuta." },
  { path: "/hr", lang: "hr", locale: "hr_HR", image: "og-home-hr.jpg", alternates: ["/", "/hr"],
    title: "Nos Astra: softverski i AI studio", imageAlt: "Nos Astra: praktičan softver i AI za stvaran posao",
    description: "Nos Astra je softverski i AI studio u Hrvatskoj: AI i automatizacija za laboratorijske timove, praktične AI radionice te web stranice i alati za mala poduzeća." },
];
const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function sharePages() {
  return {
    name: "share-pages",
    apply: "build",
    closeBundle() {
      const base = readFileSync("dist/index.html", "utf8");
      for (const page of SHARE_PAGES) {
        let html = base;
        const set = (pattern, value) => {
          if (!pattern.test(html)) throw new Error(`share-pages: ${pattern} not found in index.html`);
          html = html.replace(pattern, (_, before, after) => before + escapeHtml(value) + after);
        };
        const url = SITE + page.path;
        set(/(<html lang=")[^"]*(")/, page.lang);
        set(/(<title>)[^<]*(<\/title>)/, page.title);
        set(/(<meta name="description" content=")[^"]*(")/, page.description);
        set(/(<link rel="canonical" href=")[^"]*(")/, url);
        set(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, SITE + page.alternates[0]);
        set(/(<link rel="alternate" hreflang="hr" href=")[^"]*(")/, SITE + page.alternates[1]);
        set(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, SITE + page.alternates[0]);
        set(/(<meta property="og:locale" content=")[^"]*(")/, page.locale);
        set(/(<meta property="og:title" content=")[^"]*(")/, page.title);
        set(/(<meta property="og:description" content=")[^"]*(")/, page.description);
        set(/(<meta property="og:url" content=")[^"]*(")/, url);
        set(/(<meta property="og:image" content=")[^"]*(")/, `${SITE}/${page.image}`);
        set(/(<meta property="og:image:alt" content=")[^"]*(")/, page.imageAlt);
        set(/(<meta name="twitter:title" content=")[^"]*(")/, page.title);
        set(/(<meta name="twitter:description" content=")[^"]*(")/, page.description);
        set(/(<meta name="twitter:image" content=")[^"]*(")/, `${SITE}/${page.image}`);
        mkdirSync(`dist${page.path}`, { recursive: true });
        writeFileSync(`dist${page.path}/index.html`, html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), sharePages()],
  build: {
    // Vite only builds index.html by default, so privacy.html has to be named
    // explicitly or it never reaches dist/ and the footer link 404s in production.
    rollupOptions: {
      input: {
        index: "index.html",
        privacy: "privacy.html",
      },
    },
  },
});
