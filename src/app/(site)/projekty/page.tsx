import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { supabase, type Project } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Projekty — Erik Sidibe",
  description: "Přehled webových projektů vytvořených pro české firmy.",
};

export const revalidate = 0;

async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as Project[]) ?? [];
}

export default async function ProjektyPage() {
  const projects = await getProjects();

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
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Moje práce
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#f5f5f5", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
            Projekty
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.05rem", color: "#737373", maxWidth: "520px", lineHeight: 1.7 }}>
            Každý web je postaven na míru — od designu po nasazení.
          </p>
        </div>
      </section>

      {/* Projects list */}
      <section style={{ background: "#0a0a0a", padding: "4rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          {projects.length === 0 && (
            <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "4rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#525252" }}>Zatím žádné projekty.</p>
            </div>
          )}
          {projects.map((project, index) => (
            <article key={project.id} style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", overflow: "hidden" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "380px" }}>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Otevřít web ${project.name}`}
                    className="group"
                    style={{ display: "block", position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
                  >
                    <span style={{
                      position: "absolute", inset: 0,
                      background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.25s",
                    }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.45)";
                        const label = (e.currentTarget as HTMLElement).querySelector(".img-label") as HTMLElement;
                        if (label) label.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)";
                        const label = (e.currentTarget as HTMLElement).querySelector(".img-label") as HTMLElement;
                        if (label) label.style.opacity = "0";
                      }}
                    >
                      <span className="img-label" style={{
                        opacity: 0, transition: "opacity 0.25s",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        background: "#22c55e", color: "#0a0a0a",
                        fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 700,
                        padding: "0.6rem 1.25rem", borderRadius: "4px",
                        letterSpacing: "0.02em",
                      }}>
                        Otevřít web ↗
                      </span>
                    </span>
                  </a>
                ) : null}
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={project.name}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover", opacity: 0.65, transition: "opacity 0.2s" }}
                    priority={index === 0}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#1a1a1a" }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, #0f0f0f 100%)" }} />
                <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {project.url && (
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, color: "#22c55e", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(34,197,94,0.4)", padding: "3px 8px", borderRadius: "3px", letterSpacing: "0.06em" }}>
                      ↗ kliknutím otevřeš web
                    </span>
                  )}
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 600, color: "#525252", letterSpacing: "0.1em" }}>
                    {project.year}
                  </span>
                </span>
                <span style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontFamily: "var(--font-inter)", fontSize: "0.65rem", fontWeight: 600, color: "#0a0a0a", background: project.accent, padding: "3px 10px", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "2.5rem" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#f5f5f5", marginBottom: "1rem" }}>
                    {project.name}
                  </h2>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#737373", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {project.description}
                  </p>

                  {project.challenge && (
                    <div style={{ background: `rgba(0,0,0,0.3)`, borderLeft: `2px solid ${project.accent}`, padding: "0.875rem 1rem", marginBottom: "1.75rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 600, color: project.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                        Výzva projektu
                      </p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#a3a3a3", lineHeight: 1.6 }}>
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  <Link href="/kontakt" style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", padding: "0.75rem 1.5rem", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
                    Chci podobný web →
                  </Link>
                </div>

                <div>
                  {project.features.length > 0 && (
                    <div style={{ marginBottom: "2rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 600, color: "#525252", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                        Funkce
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {project.features.map((feature) => (
                          <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                            <span style={{ color: "#22c55e", fontSize: "0.75rem" }}>✓</span>
                            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "#a3a3a3" }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tech.length > 0 && (
                    <div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 600, color: "#525252", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                        Tech stack
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                        {project.tech.map((t) => (
                          <span key={t} style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 500, color: "#737373", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "3px", padding: "3px 10px" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "#f5f5f5", marginBottom: "1rem", lineHeight: 1.15 }}>
            Váš web může být
            <br />
            <span style={{ color: "#22c55e" }}>další v řadě.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "#737373", lineHeight: 1.6, marginBottom: "2rem" }}>
            Napište mi a probereme, co váš projekt potřebuje.
          </p>
          <Link href="/kontakt" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", padding: "0.875rem 2.25rem", borderRadius: "4px", textDecoration: "none", display: "inline-block" }}>
            Napsat mi →
          </Link>
        </div>
      </section>
    </>
  );
}
