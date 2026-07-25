import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const services = [
  ["AI consulting", "Find where AI is actually useful, decide what is worth building, and make a clear plan.", "#/ai-consulting"],
  ["Custom builds", "Create focused internal tools, client-facing products, and SaaS MVPs around the way your business works.", "#/custom-builds"],
  ["Workflow automation", "Connect the repetitive steps, systems, and decisions that make everyday work slower than it needs to be.", "#/workflow-automation"],
];

function Brand() {
  return <><svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path className="mark-body" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 49.63 56.27 Q 38.18 47.3 32 45 L 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 3.47 22.73 Q 18.01 23.26 24.36 21.48 Z" /><path className="mark-facet" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 32 32 Z M 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 32 32 Z M 49.63 56.27 Q 38.18 47.3 32 45 L 32 32 Z M 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 32 32 Z M 3.47 22.73 Q 18.01 23.26 24.36 21.48 L 32 32 Z" /></svg><span className="brand-name">Nos <span>Astra</span></span></>;
}

const servicePages = {
  "/ai-consulting": { label: "AI consulting", title: "Start with what is actually useful.", intro: "A practical engagement for finding where AI can remove friction, support better decisions, or make a good idea possible.", sectionKicker: "A practical approach", sectionTitle: "Clear work, useful outcomes.", items: [["Understand the work", "Look at the real process, the information people need, and the points where time or clarity are being lost."], ["Choose the right opportunity", "Separate an interesting idea from a useful one. The goal is a focused first step that people can actually adopt."], ["Make a plan you can use", "Leave with a practical recommendation, a clear scope, and a sensible route into a prototype, automation, or custom build."]] },
  "/custom-builds": { label: "Custom builds", title: "Software that fits the way you work.", intro: "Focused internal tools, client-facing products, and early-stage software built around a clear job to be done.", sectionKicker: "Selected work", sectionTitle: "Built, shipped, in use.", items: [["Maštograd", "A parent types their child’s name, sees the personalised set the moment they type it, and the order leaves as a print-ready file."], ["Welcome Book", "One QR code in a holiday apartment answers every guest question, in the guest’s own language, with no backend to maintain."], ["Erin AI", "Salon enquiries arrive as Instagram messages and leave as confirmed bookings, checked against a live calendar without anyone replying by hand."], ["Kompas AI", "Daily legislative changes are read, classified, and turned into answers accountants can rely on, grounded in the actual text of the law."]] },
  "/workflow-automation": { label: "Workflow automation", title: "Let routine work move on its own.", intro: "Connect the steps, systems, and decisions that make everyday work slower than it needs to be, while keeping people in control where it matters.", sectionKicker: "A practical approach", sectionTitle: "Clear work, useful outcomes.", items: [["Enquiries and follow-up", "Capture the right information once, put it where it belongs, and make the next person or next action clear."], ["Client onboarding", "Turn a signed yes into a consistent handover: the right documents, tasks, reminders, and people involved at the right time."], ["Information that stays useful", "Connect scattered updates and repeatable decisions so the team can act on current information instead of looking for it."]] },
};

function ServicePage({ page }) {
  return <main className="service-page"><style>{`.service-page{padding-top:82px;background:var(--ink)}.service-page .page-hero-band{background:radial-gradient(88% 120% at 50% -18%,rgba(179,197,137,.16),transparent 62%),var(--surface);border-bottom:1px solid var(--line)}.service-page .page-hero,.service-page .page-section{padding:100px 0}.service-page .page-hero p,.service-page .page-section p{max-width:600px}.service-page .page-list{border-top:1px solid var(--line);margin-top:52px}.service-page .page-item{padding:28px 0;border-bottom:1px solid var(--line)}.service-page .page-item h3{color:var(--olive);font-size:28px}.service-page .page-item p{color:var(--muted);font-size:17px;line-height:1.55;margin:10px 0 0}.service-page .page-cta{padding:80px 0;background:var(--olive);color:var(--ink)}.service-page .page-cta .button{margin-top:26px;background:var(--ink);color:var(--paper)}@media(max-width:800px){.service-page .page-hero,.service-page .page-section{padding:76px 0}}`}</style><section className="page-hero-band"><div className="shell page-hero"><p className="kicker">{page.label}</p><h1>{page.title}</h1><p className="hero-copy">{page.intro}</p></div></section><section><div className="shell page-section"><p className="kicker">{page.sectionKicker}</p><h2>{page.sectionTitle}</h2><div className="page-list">{page.items.map(([title, copy]) => <article className="page-item" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="page-cta"><div className="shell"><p className="kicker">Have something in mind?</p><h2>Let’s make it easier.</h2><a className="button" href="#contact">Start a project</a></div></section></main>;
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
    setState("sending");
    try {
      const response = await fetch("https://formspree.io/f/mqergkvn", { method: "POST", body: new FormData(event.currentTarget), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error();
      event.currentTarget.reset();
      setState("sent");
    } catch { setState("error"); }
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
  const [route, setRoute] = useState(window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    function update() {
      const hash = window.location.hash.replace("#", "");
      // In-page anchors (#contact) are not routes. On the homepage the browser just scrolls;
      // arriving at one from a service page means going home first, then scrolling there.
      if (hash && !hash.startsWith("/")) {
        if (route === "/") return;
        setRoute("/");
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
        return;
      }
      const next = hash || "/";
      if (next === route) return;
      revealRoute(() => setRoute(next));
    }
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [route]);
  useEffect(() => {
    function navigate(event) {
      const link = event.target.closest('a[href^="#/"]');
      if (!link) return;
      event.preventDefault();
      const nextRoute = link.getAttribute("href").slice(1);
      if (nextRoute === route) return;
      window.history.pushState(null, "", `#${nextRoute}`);
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
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousScrollBehavior; });
  }, [route]);
  async function copyEmail() { await navigator.clipboard?.writeText("hello@nosastra.co"); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  const content = servicePages[route] ? <ServicePage key={route} page={servicePages[route]} /> : <main id="top"><section className="hero"><div className="hero-content"><div><p className="kicker">AI consulting and custom software</p><h1>Make your business easier to run.</h1><p className="hero-copy">Nos Astra helps businesses turn manual work and good ideas into practical AI tools, automations, and products.</p><a className="hero-cta" href="#contact"><span className="hero-cta-face"><span className="hero-cta-label"><span className="hero-cta-text">Start a project</span></span></span></a></div></div><div className="hero-image"><picture><source media="(max-width: 800px)" srcSet="/nos-astra-hero-mobile-v1.png" /><img src="/nos-astra-hero-desktop-v5.png" alt="Abstract olive and graphite star sculpture" /></picture></div></section><section id="services"><div className="shell services"><div className="section-intro"><p className="kicker">What we do</p><h2>Useful systems, built around real work.</h2><p className="section-copy">Start with the problem that is wasting time, losing information, or making a good idea harder to deliver. Then build the useful part.</p></div><div className="services-grid">{services.map(([name, copy, href]) => <a className="service" href={href} key={name}><h3>{name}</h3><p>{copy}</p></a>)}</div></div></section><section id="about"><div className="shell about about-layout"><div className="portrait"><img src="/tamara-martinovic.jpg" alt="Tamara Martinovic, founder of Nos Astra" /></div><div className="about-copy"><p className="kicker">Founder</p><h2>Practical AI, built together.</h2><p><span className="name">I’m Tamara Martinovic, PhD,</span> founder of Nos Astra. I work directly with people who need practical AI and software help, from the first useful conversation to a working system.</p><a className="text-link" href="https://tamara.rocks" target="_blank" rel="noreferrer">More about Tamara</a></div></div></section><section id="contact"><div className="shell contact"><div className="contact-panel"><div><p className="kicker">Have something in mind?</p><h2>Let’s make it easier.</h2><p className="contact-note">Prefer email? <button className="copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></p></div><ContactForm /></div></div></section></main>;
  return <><header className="site-header"><div className="shell nav"><a className="brand" href="#/"><Brand /></a><nav className="nav-links"><a href="#/">Home</a><a className="contact-link" href="#contact">Start a project</a></nav></div></header>{content}<footer className="site-footer"><div className="shell"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#/"><Brand /></a><p className="footer-tagline">AI consulting and custom software for businesses with real work to improve.</p></div><nav className="footer-nav" aria-label="Footer"><div className="footer-col"><h2 className="footer-heading">Services</h2><ul><li><a href="#/ai-consulting">AI consulting</a></li><li><a href="#/custom-builds">Custom builds</a></li><li><a href="#/workflow-automation">Workflow automation</a></li></ul></div><div className="footer-col"><h2 className="footer-heading">Company</h2><ul><li><a href="#/">About</a></li><li><a href="#contact">Start a project</a></li></ul></div><div className="footer-col"><h2 className="footer-heading">Connect</h2><ul><li><a href="https://www.linkedin.com/in/tamara-codes" target="_blank" rel="noreferrer">LinkedIn</a></li><li><a href="https://github.com/tamara-codes" target="_blank" rel="noreferrer">GitHub</a></li><li><button className="footer-email copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></li></ul></div></nav></div><div className="footer-legal"><p>© {new Date().getFullYear()} Nos Astra. All rights reserved.</p><p className="footer-legal-links"><a href="privacy.html">Privacy Policy</a></p></div></div></footer></>;
}

createRoot(document.getElementById("root")).render(<App />);
