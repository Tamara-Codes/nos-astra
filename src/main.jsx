import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const services = [
  ["AI consulting", "Find where AI is actually useful, decide what is worth building, and make a clear plan.", "/ai-consulting/"],
  ["Custom builds", "Create focused internal tools, client-facing products, and SaaS MVPs around the way your business works.", "/custom-builds/"],
  ["Workflow automation", "Connect the repetitive steps, systems, and decisions that make everyday work slower than it needs to be.", "/workflow-automation/"],
];

function Brand() {
  return <><svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path className="mark-body" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 49.63 56.27 Q 38.18 47.3 32 45 L 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 3.47 22.73 Q 18.01 23.26 24.36 21.48 Z" /><path className="mark-facet" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 32 32 Z M 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 32 32 Z M 49.63 56.27 Q 38.18 47.3 32 45 L 32 32 Z M 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 32 32 Z M 3.47 22.73 Q 18.01 23.26 24.36 21.48 L 32 32 Z" /></svg><span className="brand-name">Nos <span>Astra</span></span></>;
}

const servicePages = {
  "/ai-consulting": { label: "AI consulting", title: "Start with what is actually useful.", metaTitle: "Practical AI Consulting for Businesses | Nos Astra", metaDescription: "Find practical, high-value uses for AI in your business. Get a clear recommendation and roadmap from Nos Astra founder Tamara Martinovic, PhD.", intro: "A practical engagement for finding where AI can remove friction, support better decisions, or make a good idea possible.", sectionKicker: "A practical approach", sectionTitle: "Clear work, useful outcomes.", items: [["Understand the work", "Look at the real process, the information people need, and the points where time or clarity are being lost."], ["Choose the right opportunity", "Separate an interesting idea from a useful one. The goal is a focused first step that people can actually adopt."], ["Make a plan you can use", "Leave with a practical recommendation, a clear scope, and a sensible route into a prototype, automation, or custom build."]] },
  "/custom-builds": { label: "Custom software", title: "Software that fits the way you work.", metaTitle: "Custom Software & SaaS MVP Development | Nos Astra", metaDescription: "Build focused internal tools, client-facing products, and SaaS MVPs around the way your business actually works. See selected Nos Astra projects.", intro: "Focused internal tools, client-facing products, and early-stage software built around a clear job to be done.", sectionKicker: "Selected work", sectionTitle: "Built, shipped, in use.", items: [["Maštograd", "A parent types their child’s name, sees the personalised set the moment they type it, and the order leaves as a print-ready file."], ["Welcome Book", "One QR code in a holiday apartment answers every guest question, in the guest’s own language, with no backend to maintain."], ["Erin AI", "Salon enquiries arrive as Instagram messages and leave as confirmed bookings, checked against a live calendar without anyone replying by hand."], ["Kompas AI", "Daily legislative changes are read, classified, and turned into answers accountants can rely on, grounded in the actual text of the law."]] },
  "/workflow-automation": { label: "Workflow automation", title: "Let routine work move on its own.", metaTitle: "Business Workflow Automation Services | Nos Astra", metaDescription: "Automate repetitive business processes, client onboarding, enquiries, and follow-up while keeping people in control of the decisions that matter.", intro: "Connect the steps, systems, and decisions that make everyday work slower than it needs to be, while keeping people in control where it matters.", sectionKicker: "A practical approach", sectionTitle: "Clear work, useful outcomes.", items: [["Enquiries and follow-up", "Capture the right information once, put it where it belongs, and make the next person or next action clear."], ["Client onboarding", "Turn a signed yes into a consistent handover: the right documents, tasks, reminders, and people involved at the right time."], ["Information that stays useful", "Connect scattered updates and repeatable decisions so the team can act on current information instead of looking for it."]] },
};

const homeMetadata = {
  metaTitle: "AI Consulting & Custom Software | Nos Astra",
  metaDescription: "Practical AI consulting, workflow automation, and custom software for businesses. Work directly with founder Tamara Martinovic to make work easier.",
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.nosastra.co/#organization",
      name: "Nos Astra",
      url: "https://www.nosastra.co/",
      email: "hello@nosastra.co",
      founder: { "@id": "https://www.nosastra.co/#founder" },
      sameAs: ["https://www.linkedin.com/in/tamara-codes", "https://github.com/tamara-codes"],
    },
    {
      "@type": "Person",
      "@id": "https://www.nosastra.co/#founder",
      name: "Tamara Martinovic",
      honorificSuffix: "PhD",
      url: "https://tamara.rocks",
      image: "https://www.nosastra.co/tamara-martinovic.jpg",
      jobTitle: "Founder",
      worksFor: { "@id": "https://www.nosastra.co/#organization" },
      sameAs: ["https://www.linkedin.com/in/tamara-codes", "https://github.com/tamara-codes"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.nosastra.co/#website",
      url: "https://www.nosastra.co/",
      name: "Nos Astra",
      publisher: { "@id": "https://www.nosastra.co/#organization" },
      inLanguage: "en",
    },
  ],
};

function schemaForRoute(route) {
  const page = servicePages[route];
  if (!page) return homeSchema;
  const url = `https://www.nosastra.co${route}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.label,
        description: page.metaDescription,
        url,
        provider: { "@id": "https://www.nosastra.co/#organization" },
      },
      homeSchema["@graph"][0],
      homeSchema["@graph"][1],
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nosastra.co/" },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
    ],
  };
}

function normalizedPath(pathname = window.location.pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/index.html" ? "/" : path;
}

function setMetadata(route) {
  const page = servicePages[route];
  const metadata = page || homeMetadata;
  const url = `https://www.nosastra.co${route === "/" ? "/" : `${route}/`}`;
  document.title = metadata.metaTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.metaDescription);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.metaTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.metaDescription);
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", metadata.metaTitle);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", metadata.metaDescription);
  const structuredData = document.getElementById("structured-data");
  if (structuredData) structuredData.textContent = JSON.stringify(schemaForRoute(route));
}

function ServicePage({ page }) {
  return <main className="service-page"><section className="page-hero-band"><div className="shell page-hero"><p className="kicker">{page.label}</p><h1>{page.title}</h1><p className="hero-copy">{page.intro}</p></div></section><section><div className="shell page-section"><p className="kicker">{page.sectionKicker}</p><h2>{page.sectionTitle}</h2><div className="page-list">{page.items.map(([title, copy]) => <article className="page-item" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="page-cta"><div className="shell"><p className="kicker">Have something in mind?</p><h2>Let’s make it easier.</h2><a className="button" href="/#contact">Start a project</a></div></section></main>;
}

/* Route changes cross-fade the whole screen in one short beat through the View Transitions API.
   The arrival is carried by the new page's content settling in (see .service-page in index.html)
   rather than by a full-screen effect, so navigation never has to wait on an animation.
   No View Transitions support, or reduced motion: the plain instant swap. */
function revealRoute(apply) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") { apply(); return; }
  const root = document.documentElement;
  root.dataset.reveal = "fade";
  const transition = document.startViewTransition(() => flushSync(apply));
  transition.finished.finally(() => { delete root.dataset.reveal; });
}

function ContactForm() {
  const [state, setState] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    /* Hold the form element: React clears event.currentTarget once the handler
       returns, so reading it after the await would be null. */
    const form = event.currentTarget;
    setState("sending");
    try {
      const response = await fetch("https://formspree.io/f/xpqvovvv", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setState("sent");
    } catch (error) {
      console.error("Contact form submission failed", error);
      setState("error");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required /></div>
    <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
    <div className="form-field form-field-wide"><label htmlFor="message">What would you like to make easier?</label><textarea id="message" name="message" placeholder="A little context is plenty." required /></div>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    <p className={`form-status${state === "error" ? " is-error" : ""}`} aria-live="polite">{state === "sent" ? "Thanks - I’ll be in touch shortly." : state === "error" ? "Something went wrong. Please try again in a moment." : ""}</p>
  </form>;
}

function App() {
  const [copied, setCopied] = useState(false);
  const [route, setRoute] = useState(normalizedPath());
  useEffect(() => {
    function update() {
      const next = normalizedPath();
      if (next === route) return;
      revealRoute(() => setRoute(next));
    }
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [route]);
  useEffect(() => {
    function navigate(event) {
      const link = event.target.closest("a[data-route]");
      if (!link) return;
      event.preventDefault();
      const nextRoute = normalizedPath(new URL(link.href, window.location.origin).pathname);
      if (nextRoute === route) return;
      window.history.pushState(null, "", nextRoute === "/" ? "/" : `${nextRoute}/`);
      revealRoute(() => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        setRoute(nextRoute);
        window.scrollTo(0, 0);
        requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousScrollBehavior; });
      });
    }
    document.addEventListener("click", navigate);
    return () => document.removeEventListener("click", navigate);
  }, [route]);
  useEffect(() => {
    setMetadata(route);
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousScrollBehavior; });
  }, [route]);
  async function copyEmail() { await navigator.clipboard?.writeText("hello@nosastra.co"); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  const content = servicePages[route] ? <ServicePage key={route} page={servicePages[route]} /> : <main id="top"><section className="hero"><div className="hero-content"><div><p className="kicker">AI consulting and custom software</p><h1>Make your business easier to run.</h1><p className="hero-copy">Nos Astra helps businesses turn manual work and good ideas into practical AI tools, automations, and products.</p><a className="hero-cta" href="#contact"><span className="hero-cta-face"><span className="hero-cta-label"><span className="hero-cta-text">Start a project</span></span></span></a></div></div><div className="hero-image"><picture><source media="(max-width: 800px)" srcSet="/nos-astra-hero-mobile-v1.png" /><img src="/nos-astra-hero-desktop-v5.png" width="1672" height="941" fetchPriority="high" alt="Abstract olive and graphite star sculpture" /></picture></div></section><section id="services"><div className="shell services"><div className="section-intro"><p className="kicker">What we do</p><h2>Useful systems, built around real work.</h2><p className="section-copy">Start with the problem that is wasting time, losing information, or making a good idea harder to deliver. Then build the useful part.</p></div><div className="services-grid">{services.map(([name, copy, href]) => <a className="service" href={href} data-route key={name}><h3>{name}</h3><p>{copy}</p></a>)}</div></div></section><section id="about"><div className="shell about about-layout"><div className="portrait"><img src="/tamara-martinovic.jpg" width="1254" height="1254" loading="lazy" decoding="async" alt="Tamara Martinovic, founder of Nos Astra" /></div><div className="about-copy"><h2>Practical AI, built together.</h2><p><span className="name">I’m Tamara Martinovic, PhD,</span> founder of Nos Astra. I work directly with people who need practical AI and software help, from the first useful conversation to a working system.</p><a className="text-link" href="https://tamara.rocks" target="_blank" rel="noreferrer">More about Tamara</a></div></div></section><section id="contact"><div className="shell contact"><div className="contact-panel"><div><p className="kicker">Have something in mind?</p><h2>Let’s make it easier.</h2><p className="contact-note">Prefer email? <button className="copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></p></div><ContactForm /></div></div></section></main>;
  return <><header className="site-header"><div className="shell nav"><a className="brand" href="/" data-route aria-label="Nos Astra home"><Brand /></a><nav className="nav-links" aria-label="Main navigation"><a href="/" data-route>Home</a><a className="contact-link" href="/#contact">Start a project</a></nav></div></header>{content}<footer className="site-footer"><div className="shell"><div className="footer-main"><div className="footer-brand"><a className="brand" href="/" data-route aria-label="Nos Astra home"><Brand /></a><p className="footer-tagline">AI consulting and custom software for businesses with real work to improve.</p></div><nav className="footer-nav" aria-label="Footer"><div className="footer-col"><h2 className="footer-heading">Services</h2><ul><li><a href="/ai-consulting/" data-route>AI consulting</a></li><li><a href="/custom-builds/" data-route>Custom builds</a></li><li><a href="/workflow-automation/" data-route>Workflow automation</a></li></ul></div><div className="footer-col"><h2 className="footer-heading">Company</h2><ul><li><a href="/#about">About</a></li><li><a href="/#contact">Start a project</a></li></ul></div><div className="footer-col"><h2 className="footer-heading">Connect</h2><ul><li><a href="https://www.linkedin.com/in/tamara-codes" target="_blank" rel="noreferrer">LinkedIn</a></li><li><a href="https://github.com/tamara-codes" target="_blank" rel="noreferrer">GitHub</a></li><li><button className="footer-email copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></li></ul></div></nav></div><div className="footer-legal"><p>© {new Date().getFullYear()} Nos Astra. All rights reserved.</p><p className="footer-legal-links"><a href="/privacy.html">Privacy Policy</a></p></div></div></footer></>;
}

createRoot(document.getElementById("root")).render(<App />);
