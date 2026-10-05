import React, { useState } from "react";

const copy = {
  en: {
    eyebrow: "SIGNAL BY NOS ASTRA", title: "Be the business", titleAccent: "AI recommends", intro: "Understand where your business stands, see which competitors AI recommends, and get practical guidance.", cta: "Join the waitlist", waitlistEyebrow: "EARLY ACCESS", waitlistTitle: "Get notified when Signal opens.", waitlistCopy: "Join the waitlist for an invitation when access becomes available.", emailLabel: "Email address", emailPlaceholder: "you@company.com", consent: "By joining, you agree to receive an email when Signal access opens. You can ask to be removed at any time.", privacy: "Privacy policy", waitlistSubmit: "Join the waitlist", waitlistSending: "Sending…", waitlistSuccess: "You're on the waitlist! We received your email and will contact you when Signal opens.", waitlistError: "We couldn't add you right now. Please try again or email signal@nosastra.co."
  },
  hr: {
    eyebrow: "SIGNAL BY NOS ASTRA", title: "Budite tvrtka", titleAccent: "koju AI preporučuje", intro: "Saznajte gdje se Vaša tvrtka nalazi, koje konkurente AI preporučuje i što možete poboljšati uz praktične smjernice.", cta: "Prijavite se na listu čekanja", waitlistEyebrow: "RANI PRISTUP", waitlistTitle: "Saznajte kada se otvori pristup Signalu.", waitlistCopy: "Prijavite se na listu čekanja i javit ćemo Vam kada pristup bude dostupan.", emailLabel: "E-adresa", emailPlaceholder: "vi@tvrtka.hr", consent: "Prijavom pristajete primiti e-poruku kada se otvori pristup Signalu. U bilo kojem trenutku možete zatražiti uklanjanje s liste.", privacy: "Pravila privatnosti", waitlistSubmit: "Prijavite se na listu", waitlistSending: "Slanje…", waitlistSuccess: "Na listi ste čekanja! Primili smo Vašu e-adresu i javit ćemo Vam se kada se otvori pristup Signalu.", waitlistError: "Trenutačno Vas ne možemo dodati. Pokušajte ponovno ili pišite na signal@nosastra.co."
  }
};

const capabilityStory = {
  en: {
    eyebrow: "THE QUESTIONS SIGNAL HELPS YOU ANSWER",
    title: "From being seen to being chosen.",
    lead: "When someone asks AI to recommend a business like yours, the answer can shape their shortlist before they ever reach your website. Signal is being built to help you understand that journey and decide where to focus next.",
    pillars: [
      ["Visibility", "Do you appear when buyers ask?", "A single AI answer is only a snapshot. Signal looks at a defined set of questions your customers might ask and shows when your business appears, when competitors appear instead, and how that changes across platforms and over time.", "See which buying questions include your business and which leave it out."],
      ["Traffic", "Does that attention reach your website?", "AI tools can access your pages without sending a customer to your website. Signal separates that background activity from visits that come through from AI tools. With a supported website connection, you can see which pages receive attention and whether that attention is becoming visits.", "See whether AI exposure is also bringing people to you."],
      ["Citations", "Which pages earn attention—and visits?", "Signal shows which of your pages AI tools cite in the answers it checks. A citation gives someone a path to your website; connected AI referral data shows which pages visitors actually land on. Looking at both helps you spot pages that are cited often, pages that receive visits from AI tools, and gaps between the two.", "Focus on the pages bringing visitors and improve the ones with untapped potential."],
      ["Recommendations", "Why did AI choose a competitor?", "When a competitor appears for a question that matters to your business, Signal will look into the reason, not just count the mention. It will review the answer and any cited competitor pages, compare what they explain with what customers can find on your site, and show what may be missing. That could be clearer pricing, a defined service area, proof of past work, or a better explanation of a service. Each suggestion will point back to the question and evidence behind it.", "Know what the competitor is getting credit for and what to improve on your own site."],
    ],
    howEyebrow: "HOW IT WORKS",
    howTitle: "Your website is already live. Signal connects the dots.",
    howSteps: [
      ["Add your domain", "Tell Signal which existing website belongs to your business and where it is hosted. Choose Vercel, Cloudflare, or AWS during setup; your website stays where it is."],
      ["Connect your website logs", "At launch, connect your website logs from Vercel, Cloudflare, or AWS. Signal brings AI crawler requests and visits referred by AI tools into one clear view."],
      ["See the activity that matters", "Explore which pages AI crawlers request and which pages people reach from AI tools. You can see whether AI attention is becoming visits, and which parts of your site those visitors actually reach."],
      ["Find the gaps. Improve your chances.", "Signal compares the same buyer questions across ChatGPT, Gemini, and Claude. It shows where competitors appear instead of you and suggests improvements based on the answers and cited pages."],
    ],
  },
  hr: {
    eyebrow: "PITANJA NA KOJA VAM SIGNAL POMAŽE ODGOVORITI",
    title: "Od vidljivosti do preporuke.",
    lead: "Kad netko pita AI da preporuči tvrtku poput Vaše, odgovor može utjecati na izbor prije nego što osoba uopće posjeti Vašu web-stranicu. Signal razvijamo kako biste razumjeli taj put i lakše odlučili što dalje poboljšati.",
    pillars: [
      ["Vidljivost", "Pojavljujete li se kad kupci pitaju?", "Jedan AI odgovor samo je trenutačni prikaz. Signal promatra određeni skup pitanja koja bi Vaši kupci mogli postaviti te pokazuje kada se pojavljuje Vaša tvrtka, kada se umjesto nje pojavljuju konkurenti i kako se to mijenja kroz vrijeme i među platformama.", "Otkrijte za koja se pitanja Vaša tvrtka spominje, a za koja izostaje."],
      ["Promet", "Dolaze li ljudi nakon toga na Vašu stranicu?", "AI alati mogu pristupiti Vašim stranicama, a da Vam ne pošalju nijednog posjetitelja. Signal odvaja tu pozadinsku aktivnost od posjeta koji dolaze iz AI alata. Uz podržanu vezu s web-stranicom možete vidjeti koje stranice privlače pozornost i pretvara li se ona u posjete.", "Saznajte dovodi li Vam AI prisutnost i ljude na stranicu."],
      ["Citati", "Koje stranice privlače pozornost i posjete?", "Signal pokazuje koje se Vaše stranice citiraju u AI odgovorima koje provjerava. Citat nekome otvara put do Vaše web-stranice, a povezani podaci o posjetima iz AI alata pokazuju na koje stranice posjetitelji doista dolaze. Usporedbom tih podataka vidite koje se stranice često citiraju, koje primaju posjete iz AI alata i gdje između toga postoji razlika.", "Usmjerite trud na stranice koje dovode posjetitelje i poboljšajte one s neiskorištenim potencijalom."],
      ["Preporuke", "Zašto je AI preporučio konkurenta?", "Kad se konkurent pojavi u odgovoru na pitanje važno za Vaše poslovanje, Signal će istražiti zašto, a ne samo zabilježiti spominjanje. Pregledat će odgovor i eventualne citirane stranice konkurenta, usporediti što one objašnjavaju s informacijama na Vašoj stranici i pokazati što možda nedostaje. To mogu biti jasnije cijene, područje rada, primjeri prethodnih projekata ili bolji opis usluge. Svaki prijedlog bit će povezan s pitanjem i opažanjima na kojima se temelji.", "Saznajte zbog čega se ističe konkurent i što konkretno možete poboljšati."],
    ],
    howEyebrow: "KAKO SIGNAL RADI",
    howTitle: "Vaša je stranica već aktivna. Signal povezuje podatke.",
    howSteps: [
      ["Dodajte svoju domenu", "Recite Signalu koja postojeća web-stranica pripada Vašoj tvrtki i gdje je smještena. Pri postavljanju odaberite Vercel, Cloudflare ili AWS; Vaša stranica ostaje ondje gdje jest."],
      ["Povežite zapise stranice", "Pri pokretanju povežite zapise svoje web-stranice na platformi Vercel, Cloudflare ili AWS. Signal će na jednom mjestu prikazati zahtjeve AI pretraživača i posjete koji dolaze iz AI alata."],
      ["Pogledajte što je važno", "Otkrijte koje stranice traže AI pretraživači i na koje stranice ljudi dolaze iz AI alata. Vidjet ćete pretvara li se pozornost AI alata u posjete i na koje dijelove Vaše stranice ti posjetitelji doista dolaze."],
      ["Pronađite razlike. Poboljšajte svoje izglede.", "Signal uspoređuje ista pitanja kupaca na ChatGPT-u, Geminiju i Claudeu. Pokazuje gdje se umjesto Vas pojavljuju konkurenti i predlaže poboljšanja na temelju odgovora i citiranih stranica."],
    ],
  },
};

function BeaconMark() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false"><circle cx="16" cy="32" r="5" fill="currentColor" /><path d="M25 22c10 5 10 15 0 20M31 12c17 10 17 30 0 40M38 5c21 13 21 41 0 54" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" /></svg>;
}
function SignalWaitlist({ s, hr }) {
  const [state, setState] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    try {
      const response = await fetch("https://formspree.io/f/xpqvovvv", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Waitlist submission failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }
  return <section id="signal-waitlist" className="signal-waitlist"><div className="shell signal-waitlist-inner"><div><p className="kicker">{s.waitlistEyebrow}</p><h2>{s.waitlistTitle}</h2><p>{s.waitlistCopy}</p></div><form className="signal-waitlist-form" onSubmit={submit}><input type="hidden" name="enquiry_type" value="Signal waitlist" /><input type="hidden" name="language" value={hr ? "Croatian" : "English"} /><label htmlFor="signal-waitlist-email">{s.emailLabel}</label><input id="signal-waitlist-email" name="email" type="email" autoComplete="email" placeholder={s.emailPlaceholder} required /><p className="signal-waitlist-note">{s.consent} <a href={hr ? "/hr/privacy.html" : "/privacy.html"}>{s.privacy}</a></p><button className="signal-primary-cta" type="submit" disabled={state === "sending"}>{state === "sending" ? s.waitlistSending : s.waitlistSubmit}<span aria-hidden="true">↗</span></button><p className={`signal-waitlist-status${state === "error" ? " is-error" : ""}`} aria-live="polite">{state === "sent" ? s.waitlistSuccess : state === "error" ? s.waitlistError : ""}</p></form></div></section>;
}
export default function SignalPage({ hr }) {
  const s = copy[hr ? "hr" : "en"];
  const story = capabilityStory[hr ? "hr" : "en"];
  return <>
    <header className="signal-site-header"><div className="shell signal-nav"><a className="signal-wordmark" href={hr ? "/hr" : "/"} aria-label="Signal by Nos Astra"><span className="signal-wordmark-mark"><BeaconMark /></span><span className="signal-wordmark-name">s<span className="signal-brand-i">i</span>gnal</span></a><nav aria-label={hr ? "Glavna navigacija" : "Main navigation"}><a href="#signal-tracks">{hr ? "Mogućnosti" : "Features"}</a><a href="#signal-waitlist">{hr ? "Lista čekanja" : "Waitlist"}</a><a className="signal-nav-locale" href={hr ? "/signal" : "/hr/signal"}>{hr ? "EN" : "HR"}</a></nav></div></header>
    <main className="signal-page">
    <section className="signal-hero"><div className="shell signal-hero-inner"><div className="signal-hero-copy"><p className="kicker"><span className="signal-live-dot" />{hr ? "VAŠA AI PRISUTNOST, JASNO PRIKAZANA" : "YOUR AI PRESENCE, MADE VISIBLE"}</p><h1>{s.title}<br /><em>{s.titleAccent}</em></h1><p>{s.intro}</p><div className="signal-actions"><a className="signal-primary-cta" href="#signal-waitlist">{s.cta}<span aria-hidden="true">↗</span></a></div></div><div className="signal-hero-visual signal-hero-capabilities"><div className="signal-hero-art signal-hero-image"><div className="signal-hero-graphic"><img src="/signal-hero-capabilities-v6.png" width="1536" height="1024" fetchPriority="high" alt={hr ? "AI vidljivost, citati, promet i preporuke" : "Visibility, citations, traffic and recommendations"} /><span className="signal-hero-label signal-hero-label-visibility" aria-hidden="true">VISIBILITY</span><span className="signal-hero-label signal-hero-label-citations" aria-hidden="true">CITATIONS</span><span className="signal-hero-label signal-hero-label-traffic" aria-hidden="true">TRAFFIC</span><span className="signal-hero-label signal-hero-label-recommendations" aria-hidden="true">RECOMMENDATIONS</span></div></div></div></div></section>
    <section id="signal-tracks" className="signal-capabilities"><div className="shell"><div className="signal-capabilities-intro"><p className="kicker">{story.eyebrow}</p><h2>{story.title}</h2><p>{story.lead}</p></div><div className="signal-pillar-list">{story.pillars.map(([name, question, explanation, outcome], index) => <article className="signal-pillar" key={name}><div className="signal-pillar-label"><span>0{index + 1} / 04</span><h3>{name}</h3></div><div className="signal-pillar-content"><h4>{question}</h4><p>{explanation}</p><p className="signal-pillar-outcome"><span aria-hidden="true">↗</span>{outcome}</p></div></article>)}</div></div></section>
    <section id="signal-how" className="signal-how"><div className="shell"><div className="signal-how-heading"><p className="kicker">{story.howEyebrow}</p><h2>{story.howTitle}</h2></div><ol className="signal-how-steps">{story.howSteps.map(([title, description], index) => <li key={title} className="signal-how-step"><div className="signal-how-art"><img src={["/signal-how-domain-v1.png", "/signal-how-logs-v1.png", "/signal-how-insights-v1.png", "/signal-how-compare-v1.png"][index]} width="1792" height="1024" loading="lazy" alt="" /></div><div className="signal-how-copy"><span className="signal-how-index">0{index + 1} / 0{story.howSteps.length}</span><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>
    <SignalWaitlist s={s} hr={hr} />
  </main>
  </>;
}
