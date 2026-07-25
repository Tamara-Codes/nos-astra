import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const servicePages = [
  {
    slug: "ai-consulting",
    label: "AI consulting",
    title: "Start with what is actually useful.",
    metaTitle: "Practical AI Consulting for Businesses | Nos Astra",
    description: "Find practical, high-value uses for AI in your business. Get a clear recommendation and roadmap from Nos Astra founder Tamara Martinovic, PhD.",
    intro: "A practical engagement for finding where AI can remove friction, support better decisions, or make a good idea possible.",
    sectionKicker: "A practical approach",
    sectionTitle: "Clear work, useful outcomes.",
    items: [
      ["Understand the work", "Look at the real process, the information people need, and the points where time or clarity are being lost."],
      ["Choose the right opportunity", "Separate an interesting idea from a useful one. The goal is a focused first step that people can actually adopt."],
      ["Make a plan you can use", "Leave with a practical recommendation, a clear scope, and a sensible route into a prototype, automation, or custom build."],
    ],
  },
  {
    slug: "custom-builds",
    label: "Custom software",
    title: "Software that fits the way you work.",
    metaTitle: "Custom Software & SaaS MVP Development | Nos Astra",
    description: "Build focused internal tools, client-facing products, and SaaS MVPs around the way your business actually works. See selected Nos Astra projects.",
    intro: "Focused internal tools, client-facing products, and early-stage software built around a clear job to be done.",
    sectionKicker: "Selected work",
    sectionTitle: "Built, shipped, in use.",
    items: [
      ["Maštograd", "A parent types their child’s name, sees the personalised set the moment they type it, and the order leaves as a print-ready file."],
      ["Welcome Book", "One QR code in a holiday apartment answers every guest question, in the guest’s own language, with no backend to maintain."],
      ["Erin AI", "Salon enquiries arrive as Instagram messages and leave as confirmed bookings, checked against a live calendar without anyone replying by hand."],
      ["Kompas AI", "Daily legislative changes are read, classified, and turned into answers accountants can rely on, grounded in the actual text of the law."],
    ],
  },
  {
    slug: "workflow-automation",
    label: "Workflow automation",
    title: "Let routine work move on its own.",
    metaTitle: "Business Workflow Automation Services | Nos Astra",
    description: "Automate repetitive business processes, client onboarding, enquiries, and follow-up while keeping people in control of the decisions that matter.",
    intro: "Connect the steps, systems, and decisions that make everyday work slower than it needs to be, while keeping people in control where it matters.",
    sectionKicker: "A practical approach",
    sectionTitle: "Clear work, useful outcomes.",
    items: [
      ["Enquiries and follow-up", "Capture the right information once, put it where it belongs, and make the next person or next action clear."],
      ["Client onboarding", "Turn a signed yes into a consistent handover: the right documents, tasks, reminders, and people involved at the right time."],
      ["Information that stays useful", "Connect scattered updates and repeatable decisions so the team can act on current information instead of looking for it."],
    ],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function serviceMarkup(page) {
  const items = page.items
    .map(([title, copy]) => `<article class="page-item"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`)
    .join("");
  return `<main class="service-page">
      <section class="page-hero-band"><div class="shell page-hero">
        <p class="kicker">${escapeHtml(page.label)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="hero-copy">${escapeHtml(page.intro)}</p>
      </div></section>
      <section><div class="shell page-section">
        <p class="kicker">${escapeHtml(page.sectionKicker)}</p>
        <h2>${escapeHtml(page.sectionTitle)}</h2>
        <div class="page-list">${items}</div>
      </div></section>
      <section class="page-cta"><div class="shell">
        <p class="kicker">Have something in mind?</p>
        <h2>Let’s make it easier.</h2>
        <a class="button" href="/#contact">Start a project</a>
      </div></section>
    </main>`;
}

function serviceSchema(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://www.nosastra.co/${page.slug}/#service`,
        name: page.label,
        description: page.description,
        url: `https://www.nosastra.co/${page.slug}/`,
        provider: { "@id": "https://www.nosastra.co/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://www.nosastra.co/#organization",
        name: "Nos Astra",
        url: "https://www.nosastra.co/",
        email: "hello@nosastra.co",
        founder: { "@id": "https://www.nosastra.co/#founder" },
      },
      {
        "@type": "Person",
        "@id": "https://www.nosastra.co/#founder",
        name: "Tamara Martinovic",
        honorificSuffix: "PhD",
        url: "https://tamara.rocks",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nosastra.co/" },
          { "@type": "ListItem", position: 2, name: page.label, item: `https://www.nosastra.co/${page.slug}/` },
        ],
      },
    ],
  });
}

function prerenderServicePages() {
  return {
    name: "prerender-service-pages",
    apply: "build",
    async writeBundle(outputOptions) {
      const outputDirectory = resolve(outputOptions.dir || "dist");
      const homepage = await readFile(resolve(outputDirectory, "index.html"), "utf8");

      for (const page of servicePages) {
        const url = `https://www.nosastra.co/${page.slug}/`;
        const html = homepage
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.metaTitle)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeHtml(page.description)}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${url}$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(page.metaTitle)}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(page.description)}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${url}$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(page.metaTitle)}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(page.description)}$2`)
          .replace(/(<script id="structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/, `$1${serviceSchema(page)}$2`)
          .replace(/<main id="top">[\s\S]*?<\/main>/, serviceMarkup(page))
          .replaceAll('href="#top"', 'href="/"')
          .replaceAll('href="#services"', 'href="/#services"')
          .replaceAll('href="#about"', 'href="/#about"')
          .replaceAll('href="#contact"', 'href="/#contact"');

        const pageDirectory = resolve(outputDirectory, page.slug);
        await mkdir(pageDirectory, { recursive: true });
        await writeFile(resolve(pageDirectory, "index.html"), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderServicePages()],
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
