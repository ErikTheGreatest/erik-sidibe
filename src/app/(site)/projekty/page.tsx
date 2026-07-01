import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekty — Erik Sidibe",
  description: "Přehled webových projektů vytvořených pro české firmy.",
};

const projects = [
  {
    slug: "pekarna",
    name: "Pekárna U Zlatého klasu",
    category: "E-commerce & Restaurace",
    year: "2024",
    description:
      "Kompletní webová prezentace pro tradiční českou pekárnu. Projekt zahrnuje online menu s filtrováním podle kategorií, systém rezervací stolů a plnohodnotný administrační panel pro správu produktů, recenzí a objednávek.",
    challenge:
      "Klient potřeboval jednoduchý způsob, jak aktualizovat denní nabídku bez technických znalostí. Řešením byl přehledný admin panel postavený na Supabase.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
    accent: "#d97706",
    accentLight: "rgba(217,119,6,0.1)",
    features: ["Online menu", "Rezervační systém", "Admin panel", "Responzivní design"],
  },
  {
    slug: "zelena-strecha",
    name: "Zelená Střecha",
    category: "Zahradnictví & Služby",
    year: "2024",
    description:
      "Prémiová webová prezentace pro zahradnickou firmu specializující se na zelené střechy a zahrady. Web obsahuje galerii realizací, detailní ceník služeb, sekci reference a kontaktní formulář napojený na Supabase.",
    challenge:
      "Klíčem bylo vizuálně přesvědčivě prezentovat realizované projekty a zároveň zajistit snadný příjem poptávek přes kontaktní formulář.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    accent: "#16a34a",
    accentLight: "rgba(22,163,74,0.1)",
    features: ["Galerie realizací", "Ceník služeb", "Kontaktní formulář", "Admin panel"],
  },
];

export default function ProjektyPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          background: "#0a0a0a",
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
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
              Moje práce
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Projekty
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.05rem",
              color: "#737373",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Každý web je postaven na míru — od designu po nasazení. Tady jsou projekty, na které jsem hrdý.
          </p>
        </div>
      </section>

      {/* Projects list */}
      <section style={{ background: "#0a0a0a", padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          {projects.map((project, index) => (
            <article
              key={project.slug}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                overflow: "hidden",
              }}
            >
              {/* Image full width */}
              <div style={{ position: "relative", height: "380px" }}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", opacity: 0.65 }}
                  priority={index === 0}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 20%, #0f0f0f 100%)",
                  }}
                />
                {/* Floating year */}
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#525252",
                    letterSpacing: "0.1em",
                  }}
                >
                  {project.year}
                </span>
                {/* Category */}
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "#0a0a0a",
                    background: project.accent,
                    padding: "3px 10px",
                    borderRadius: "2px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                  gap: "2.5rem",
                }}
              >
                {/* Left col */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 700,
                      color: "#f5f5f5",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9rem",
                      color: "#737373",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Challenge */}
                  <div
                    style={{
                      background: project.accentLight,
                      borderLeft: `2px solid ${project.accent}`,
                      padding: "0.875rem 1rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: project.accent,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Výzva projektu
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.85rem",
                        color: "#a3a3a3",
                        lineHeight: 1.6,
                      }}
                    >
                      {project.challenge}
                    </p>
                  </div>

                  <Link
                    href="/kontakt"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0a0a0a",
                      background: "#22c55e",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "4px",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Chci podobný web →
                  </Link>
                </div>

                {/* Right col */}
                <div>
                  {/* Features */}
                  <div style={{ marginBottom: "2rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "#525252",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "0.875rem",
                      }}
                    >
                      Funkce
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {project.features.map((feature) => (
                        <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <span style={{ color: "#22c55e", fontSize: "0.75rem" }}>✓</span>
                          <span
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.875rem",
                              color: "#a3a3a3",
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "#525252",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "0.875rem",
                      }}
                    >
                      Tech stack
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "#737373",
                            background: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            borderRadius: "3px",
                            padding: "3px 10px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
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
            Váš web může být
            <br />
            <span style={{ color: "#22c55e" }}>další v řadě.</span>
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
            Napište mi a probereme, co váš projekt potřebuje.
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
