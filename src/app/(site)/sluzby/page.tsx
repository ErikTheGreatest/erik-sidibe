import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Služby — Erik Sidibe",
  description: "Freelance webový vývoj pro české firmy. Prezentační weby a weby s admin panelem.",
};

const services = [
  {
    title: "Prezentační web",
    subtitle: "1–4 stránky",
    price: "od 5 000 Kč",
    description:
      "Moderní webová prezentace pro firmy, živnostníky nebo freelancery. Rychlý, responzivní a nasazený na Vercelu s vlastní doménou.",
    features: [
      "Do 4 stránek (Domů, O nás, Služby, Kontakt)",
      "Responzivní design — mobil i desktop",
      "Kontaktní formulář",
      "Nasazení na Vercel + vlastní doména",
      "Optimalizace rychlosti",
      "Předání zdrojového kódu",
    ],
    timeline: "1–2 týdny",
    accent: "#22c55e",
    highlight: false,
  },
  {
    title: "Web s admin panelem",
    subtitle: "Plnohodnotná aplikace",
    price: "od 8 000 Kč",
    description:
      "Kompletní webová aplikace s databází a administračním panelem. Klient může sám spravovat obsah bez technických znalostí.",
    features: [
      "Vše z prezentačního webu",
      "Supabase databáze + autentizace",
      "Admin panel pro správu obsahu",
      "Kontaktní formulář → databáze",
      "Neomezené stránky a sekce",
      "3 měsíce bezplatných oprav",
    ],
    timeline: "2–4 týdny",
    accent: "#22c55e",
    highlight: true,
  },
];

const process = [
  {
    step: "01",
    title: "Úvodní konzultace",
    description: "Probereme váš projekt, cíle a požadavky. Zdarma, bez závazků.",
  },
  {
    step: "02",
    title: "Nabídka & timeline",
    description: "Připravím konkrétní cenovou nabídku a harmonogram do 24 hodin.",
  },
  {
    step: "03",
    title: "Vývoj",
    description: "Stavím web po krocích, průběžně vás informuji a zapracovávám zpětnou vazbu.",
  },
  {
    step: "04",
    title: "Nasazení & předání",
    description: "Web nasadím na Vercel, předám zdrojový kód a vysvětlím správu.",
  },
];

const faqs = [
  {
    q: "Jak probíhá platba?",
    a: "50 % záloha před zahájením, 50 % po dokončení a schválení webu.",
  },
  {
    q: "Mohu web po předání sám upravovat?",
    a: "Ano. Weby s admin panelem umožňují úpravu obsahu bez technických znalostí. U prezentačních webů předám kód a základní návod.",
  },
  {
    q: "Zajišťuješ i hosting a doménu?",
    a: "Nasazení na Vercel je součástí ceny. Doménu si zaregistrujete sami (cca 200–400 Kč/rok) nebo vám s tím pomohu.",
  },
  {
    q: "Děláš i úpravy stávajících webů?",
    a: "Ano, dohodou. Napište mi co potřebujete a připravím nabídku.",
  },
];

export default function SluzbyPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          background: "#0a0a0a",
          paddingTop: "120px",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderBottom: "1px solid #1a1a1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: "500px", height: "500px", background: "radial-gradient(ellipse at top right, rgba(34,197,94,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "#22c55e" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Co nabízím
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#f5f5f5", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
            Služby
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "#737373", maxWidth: "500px", lineHeight: 1.7 }}>
            Stavím weby na míru pro české firmy a živnostníky. Orientační ceny — finální nabídka závisí na rozsahu projektu.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "#0a0a0a", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "1px", background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
            {services.map((service) => (
              <div
                key={service.title}
                style={{
                  background: service.highlight ? "#0d1a0d" : "#0f0f0f",
                  padding: "2.5rem",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {service.highlight && (
                  <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", padding: "3px 10px", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Doporučeno
                  </span>
                )}

                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", fontWeight: 600, color: "#525252", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {service.subtitle}
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "0.75rem" }}>
                  {service.title}
                </h2>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700, color: "#22c55e", marginBottom: "1rem" }}>
                  {service.price}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#737373", lineHeight: 1.65, marginBottom: "1.75rem" }}>
                  {service.description}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                  {service.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ color: "#22c55e", fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#a3a3a3", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#525252" }}>Doba realizace</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", fontWeight: 600, color: "#d4d4d4" }}>{service.timeline}</span>
                </div>

                <Link href="/kontakt" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 600, color: service.highlight ? "#0a0a0a" : "#f5f5f5", background: service.highlight ? "#22c55e" : "transparent", border: `1px solid ${service.highlight ? "#22c55e" : "#2a2a2a"}`, padding: "0.875rem", borderRadius: "4px", textDecoration: "none", marginTop: "auto" }}>
                  Nezávazná poptávka →
                </Link>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#525252", textAlign: "center", marginTop: "1.25rem" }}>
            Ceny jsou orientační. Finální nabídka závisí na rozsahu a složitosti projektu.
          </p>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#0f0f0f", padding: "5rem 1.5rem", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Jak to funguje
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f5f5f5", lineHeight: 1.1, marginBottom: "3rem" }}>
            Proces spolupráce
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1px", background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
            {process.map((item) => (
              <div key={item.step} style={{ background: "#0f0f0f", padding: "2rem" }}>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "2.5rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1, marginBottom: "1rem" }}>
                  {item.step}
                </p>
                <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "0.6rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#737373", lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#0a0a0a", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f5f5f5", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Časté otázky
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1a1a1a", border: "1px solid #1a1a1a" }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ background: "#0f0f0f", padding: "1.5rem 2rem" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f5", marginBottom: "0.5rem" }}>
                  {faq.q}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#737373", lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "#f5f5f5", marginBottom: "1rem", lineHeight: 1.15 }}>
            Pojďme na váš projekt.
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "#737373", lineHeight: 1.6, marginBottom: "2rem" }}>
            Napište mi a do 24 hodin připravím nezávaznou nabídku.
          </p>
          <Link href="/kontakt" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", padding: "0.875rem 2.25rem", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
            Napsat mi →
          </Link>
        </div>
      </section>
    </>
  );
}
