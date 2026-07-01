import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O mně — Erik Sidibe",
  description: "Freelance web developer z České republiky. Stavím moderní weby pro české firmy.",
};

const values = [
  {
    title: "Kód bez kompromisů",
    description:
      "Každý projekt nasazuji s TypeScriptem, automatickým CI/CD a zero TypeScript errory. Pokud to neprojde buildem, není to hotové.",
  },
  {
    title: "Rychlost jako funkce",
    description:
      "Pomalý web ztrácí zákazníky. Optimalizuji výkon od první řádky kódu — Next.js, server components, správné image loading.",
  },
  {
    title: "Komunikace bez výmluv",
    description:
      "Vím, co klient chce slyšet — timeline, co se děje a proč. Žádné technické kecy navíc, jen jasné informace.",
  },
  {
    title: "Design s účelem",
    description:
      "Hezký web, který neprodává, je zbytečný. Stavím weby s jasnou strukturou a výzvami k akci, ne jen vizuálním veletrhem.",
  },
];

export default function OMnePage() {
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
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(ellipse at top right, rgba(34,197,94,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "#22c55e" }} />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#22c55e",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Kdo jsem
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "#f5f5f5",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                Jsem Erik.
                <br />
                <span style={{ color: "#22c55e" }}>Stavím weby.</span>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.05rem",
                  color: "#a3a3a3",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}
              >
                Je mi 16 let, žiji v České republice a provozuji freelance webový vývoj.
                Začal jsem kódovat ve škole a rychle jsem zjistil, že mě baví
                stavět věci, které skutečně fungují — nejen vypadat dobře.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.05rem",
                  color: "#a3a3a3",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                }}
              >
                Specializuji se na moderní webové aplikace pro české firmy —
                od jednoduchých prezentačních webů po komplexní systémy
                s databází, administračním panelem a automatickým nasazením.
              </p>
              <Link
                href="/kontakt"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#0a0a0a",
                  background: "#22c55e",
                  padding: "0.875rem 2rem",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Napsat mi →
              </Link>
            </div>

            {/* Quick facts */}
            <div
              style={{
                background: "#0f0f0f",
                border: "1px solid #1f1f1f",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#525252",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                Na první pohled
              </p>
              {[
                { label: "Věk", value: "16 let" },
                { label: "Lokalita", value: "Česká republika" },
                { label: "Hlavní stack", value: "Next.js + Supabase" },
                { label: "Nasazení", value: "Vercel" },
                { label: "Jazyky", value: "Čeština, Angličtina" },
                { label: "Dostupnost", value: "Otevřen novým projektům" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid #1a1a1a",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "#525252",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: item.label === "Dostupnost" ? "#22c55e" : "#d4d4d4",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#0a0a0a", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#22c55e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Přístup k práci
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: "3rem",
              lineHeight: 1.1,
            }}
          >
            Proč si vybrat mě
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1px",
              background: "#1a1a1a",
              border: "1px solid #1a1a1a",
            }}
          >
            {values.map((value) => (
              <div
                key={value.title}
                style={{
                  background: "#0f0f0f",
                  padding: "2rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    background: "#22c55e",
                    marginBottom: "1.25rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: "0.75rem",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    color: "#737373",
                    lineHeight: 1.65,
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#0d0d0d",
          borderTop: "1px solid #1a1a1a",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Pojďme spolupracovat.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              color: "#737373",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Napište mi a probereme váš projekt. Odpovím do 24 hodin.
          </p>
          <Link
            href="/kontakt"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#0a0a0a",
              background: "#22c55e",
              padding: "0.875rem 2.25rem",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Napsat mi →
          </Link>
        </div>
      </section>
    </>
  );
}
