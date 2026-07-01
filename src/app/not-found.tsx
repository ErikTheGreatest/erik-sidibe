import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 700,
            color: "#22c55e",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#f5f5f5",
            marginBottom: "0.75rem",
          }}
        >
          Stránka nenalezena
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.95rem",
            color: "#737373",
            marginBottom: "2rem",
          }}
        >
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <Link
          href="/"
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
          Zpět na domovskou stránku
        </Link>
      </div>
    </div>
  );
}
