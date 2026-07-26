import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

/* The third entry is the product's own site. Left empty until a product has one:
   an empty href renders the card as plain text instead of a dead link. */
const products = [
  ["StackLight", "One daily email that reads the status pages and changelogs behind your stack, and marks each change red, yellow, or green so you only stop for the ones that break things.", "https://stacklight.nosastra.co"],
  ["Welcome Book", "One QR code in a holiday apartment answers every guest question, in the guest’s own language, with nothing for the host to maintain.", "https://welcomebook.eu"],
  ["Maštograd", "A parent types their child’s name, sees the personalised set the moment they type it, and the order leaves as a print-ready file.", "https://mastograd.eu"],
];

function Brand() {
  return <><svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path className="mark-body" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 49.63 56.27 Q 38.18 47.3 32 45 L 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 3.47 22.73 Q 18.01 23.26 24.36 21.48 Z" /><path className="mark-facet" d="M 32 2 Q 35.99 15.99 39.64 21.48 L 32 32 Z M 60.53 22.73 Q 48.46 30.85 44.36 36.02 L 32 32 Z M 49.63 56.27 Q 38.18 47.3 32 45 L 32 32 Z M 14.37 56.27 Q 19.36 42.61 19.64 36.02 L 32 32 Z M 3.47 22.73 Q 18.01 23.26 24.36 21.48 L 32 32 Z" /></svg><span className="brand-name">Nos <span>Astra</span></span></>;
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
    <div className="form-field form-field-wide"><label htmlFor="message">What would you like to ask?</label><textarea id="message" name="message" placeholder="A little context is plenty." required /></div>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
    <p className={`form-status${state === "error" ? " is-error" : ""}`} aria-live="polite">{state === "sent" ? "Thanks - I’ll be in touch shortly." : state === "error" ? "Something went wrong. Please try again in a moment." : ""}</p>
  </form>;
}

function ProductCard({ name, copy, href }) {
  const body = <><h3>{name}</h3><p>{copy}</p></>;
  if (!href) return <article className="product">{body}</article>;
  return <a className="product is-link" href={href} target="_blank" rel="noreferrer">{body}</a>;
}

function App() {
  const [copied, setCopied] = useState(false);
  /* The scrolled header state used to live in an inline script in index.html, which binds
     by id - and that id is now inside the pre-hydration copy React hides, so the real
     header never picked the class up. Own it here. */
  useEffect(() => {
    const header = document.querySelector("#root .site-header");
    if (!header) return;
    let ticking = false;
    function apply() { header.classList.toggle("is-scrolled", window.scrollY > 24); ticking = false; }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  async function copyEmail() { await navigator.clipboard?.writeText("hello@nosastra.co"); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  return <>
    <header className="site-header"><div className="shell nav"><a className="brand" href="#top" aria-label="Nos Astra home"><Brand /></a><nav className="nav-links" aria-label="Main navigation"><a href="#products">Products</a><a href="#about">About</a><a className="contact-link" href="#contact">Get in touch</a></nav></div></header>
    <main id="top">
      <section className="hero"><div className="hero-content"><div><p className="kicker">A one-person software studio</p><h1>Software that does one job well.</h1><p className="hero-copy">Nos Astra makes and runs three small products. Each one takes a single tedious job off your hands, then quietly keeps doing it.</p><a className="hero-cta" href="#products"><span className="hero-cta-face"><span className="hero-cta-label"><span className="hero-cta-text">See the products</span></span></span></a></div></div><div className="hero-image"><picture><source media="(max-width: 800px)" srcSet="/nos-astra-hero-mobile-v1.png" /><img src="/nos-astra-hero-desktop-v5.png" width="1672" height="941" fetchPriority="high" alt="Abstract olive and graphite star sculpture" /></picture></div></section>
      <section id="products"><div className="shell services"><div className="section-intro"><p className="kicker">What I make</p><h2>Built, shipped, in use.</h2><p className="section-copy">Each one started as a real problem someone kept running into. None of them tries to do everything, and all of them are built to keep working without anyone tending them.</p></div><div className="services-grid">{products.map(([name, copy, href]) => <ProductCard key={name} name={name} copy={copy} href={href} />)}</div></div></section>
      <section id="about"><div className="shell about about-layout"><div className="portrait"><img src="/tamara-martinovic.jpg" width="1254" height="1254" loading="lazy" decoding="async" alt="Tamara Martinovic, founder of Nos Astra" /></div><div className="about-copy"><h2>Made by one person.</h2><p><span className="name">I’m Tamara Martinovic, PhD,</span> founder of Nos Astra. I design, build, and support these products myself, so the person who answers your email is the person who wrote the software.</p><a className="text-link" href="https://tamara.rocks" target="_blank" rel="noreferrer">More about Tamara</a></div></div></section>
      <section id="contact"><div className="shell contact"><div className="contact-panel"><div><p className="kicker">Questions about a product?</p><h2>Just ask.</h2><p className="contact-note">Prefer email? <button className="copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></p></div><ContactForm /></div></div></section>
    </main>
    <footer className="site-footer"><div className="shell"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#top" aria-label="Nos Astra home"><Brand /></a><p className="footer-tagline">Small software products, built and run by one person.</p></div><nav className="footer-nav" aria-label="Footer"><div className="footer-col"><h2 className="footer-heading">Products</h2><ul>{products.map(([name, , href]) => <li key={name}>{href ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : <a href="#products">{name}</a>}</li>)}</ul></div><div className="footer-col"><h2 className="footer-heading">Company</h2><ul><li><a href="#about">About</a></li><li><a href="#contact">Get in touch</a></li></ul></div><div className="footer-col"><h2 className="footer-heading">Connect</h2><ul><li><a href="https://www.linkedin.com/in/tamara-codes" target="_blank" rel="noreferrer">LinkedIn</a></li><li><a href="https://github.com/tamara-codes" target="_blank" rel="noreferrer">GitHub</a></li><li><button className="footer-email copy-email" type="button" onClick={copyEmail}>{copied ? "Email copied" : "hello@nosastra.co"}</button></li></ul></div></nav></div><div className="footer-legal"><p>© {new Date().getFullYear()} Nos Astra. All rights reserved.</p><p className="footer-legal-links"><a href="/privacy.html">Privacy Policy</a></p></div></div></footer>
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
