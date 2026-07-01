import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid #1f1f1f",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#f5f5f5",
              marginBottom: "0.75rem",
            }}
          >
            Erik<span style={{ color: "#22c55e" }}>.</span>
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#737373",
              lineHeight: 1.6,
            }}
          >
            Freelance web developer
            <br />
            Next.js · TypeScript · Supabase
          </p>
        </div>

        {/* Links */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#22c55e",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Navigace
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { href: "/projekty", label: "Projekty" },
              { href: "/sluzby", label: "Služby" },
              { href: "/o-mne", label: "O mně" },
              { href: "/kontakt", label: "Kontakt" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  color: "#737373",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#22c55e",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Kontakt
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#737373",
            }}
          >
            eriksidibe.dev@gmail.com
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
              color: "#737373",
              marginTop: "0.25rem",
            }}
          >
            Česká republika
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "#525252",
          }}
        >
          © {year} Erik Sidibe. Všechna práva vyhrazena.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "#525252",
          }}
        >
          Postaveno s Next.js + Vercel
        </p>
      </div>
    </footer>
  );
}
