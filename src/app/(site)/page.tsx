import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    slug: "pekarna",
    name: "Pekárna U Zlatého klasu",
    category: "E-commerce & Restaurace",
    description:
      "Moderní web pro tradiční českou pekárnu — online menu, rezervace stolů a administrační panel pro správu produktů.",
    tech: ["Next.js 14", "Supabase", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    accent: "#d97706",
  },
  {
    slug: "zelena-strecha",
    name: "Zelená Střecha",
    category: "Zahradnictví & Služby",
    description:
      "Prémiový web pro zahradnickou firmu s galerií realizací, ceníkem služeb a kontaktním formulářem.",
    tech: ["Next.js 14", "Supabase", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    accent: "#16a34a",
  },
];

const skills = [
  { name: "Next.js", level: 92 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Supabase", level: 80 },
  { name: "React", level: 88 },
  { name: "Git & Vercel", level: 85 },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          paddingTop: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent shape */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                display: "block",
                width: "32px",
                height: "1px",
                background: "#22c55e",
              }}
            />
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
              Freelance Web Developer
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              maxWidth: "900px",
            }}
          >
            Weby, které
            <br />
            <span style={{ color: "#22c55e" }}>prodávají.</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#a3a3a3",
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            Stavím moderní webové aplikace pro české firmy. Rychle, čistě
            a s důrazem na výsledky — ne jen na vzhled.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/projekty"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#0a0a0a",
                background: "#22c55e",
                padding: "0.875rem 2rem",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "opacity 0.2s",
                display: "inline-block",
              }}
            >
              Zobrazit projekty →
            </Link>
            <Link
              href="/kontakt"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#f5f5f5",
                background: "transparent",
                padding: "0.875rem 2rem",
                borderRadius: "4px",
                textDecoration: "none",
                border: "1px solid #2a2a2a",
                display: "inline-block",
              }}
            >
              Napsat mi
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "2+", label: "Dokončené projekty" },
              { value: "100%", label: "Klientů doporučuje" },
              { value: "Next.js", label: "Primární stack" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#22c55e",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "#525252",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        style={{
          background: "#0f0f0f",
          padding: "6rem 1.5rem",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
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
              Moje práce
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#f5f5f5",
                lineHeight: 1.1,
              }}
            >
              Vybrané projekty
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
              gap: "2px",
            }}
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "#141414",
                  border: "1px solid #1f1f1f",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "260px" }}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", opacity: 0.7 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, transparent 30%, #141414 100%)",
                    }}
                  />
                  {/* Category badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
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
                <div style={{ padding: "1.75rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#f5f5f5",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      color: "#737373",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          color: "#737373",
                          background: "#1a1a1a",
                          border: "1px solid #2a2a2a",
                          borderRadius: "3px",
                          padding: "2px 8px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projekty`}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#22c55e",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Zobrazit projekt →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/projekty"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#f5f5f5",
                background: "transparent",
                border: "1px solid #2a2a2a",
                padding: "0.75rem 2rem",
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Všechny projekty →
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ background: "#0a0a0a", padding: "6rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
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
              Technologie
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#f5f5f5",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Co umím
              <br />
              postavit
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.95rem",
                color: "#737373",
                lineHeight: 1.7,
                maxWidth: "400px",
              }}
            >
              Specializuji se na moderní webový stack. Každý projekt
              nasazuji na Vercel s automatickým CI/CD a Supabase pro
              databázi.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "#d4d4d4",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      color: "#525252",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "#1a1a1a",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${skill.level}%`,
                      background: "#22c55e",
                      borderRadius: "2px",
                    }}
                  />
                </div>
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
          padding: "6rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#22c55e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Spolupráce
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Máte projekt?
            <br />
            Pojďme na to.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              color: "#737373",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
            }}
          >
            Ať už potřebujete nový web, redesign nebo webovou aplikaci —
            rád si promluvím o vašich potřebách.
          </p>
          <Link
            href="/kontakt"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#0a0a0a",
              background: "#22c55e",
              padding: "1rem 2.5rem",
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
