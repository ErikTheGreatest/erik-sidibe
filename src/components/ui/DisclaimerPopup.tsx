"use client";

import { useState, useEffect } from "react";

export default function DisclaimerPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("disclaimer_seen");
    if (!seen) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("disclaimer_seen", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        zIndex: 9999,
        maxWidth: "340px",
        background: "#0f0f0f",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "1.25rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Close button */}
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          background: "none",
          border: "none",
          color: "#525252",
          cursor: "pointer",
          fontSize: "1rem",
          lineHeight: 1,
        }}
        aria-label="Zavřít"
      >
        ✕
      </button>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          fontWeight: 600,
          color: "#22c55e",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}
      >
        Portfolio demo
      </p>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.8rem",
          color: "#a3a3a3",
          lineHeight: 1.5,
          marginBottom: "1rem",
        }}
      >
        Toto je fiktivní portfolio web vytvořený pro demonstraci dovedností freelance
        webového developera. Žádné projekty ani firmy zde nejsou skutečné.
      </p>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
        {["Next.js 14", "TypeScript", "Tailwind", "Supabase", "Vercel"].map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "#737373",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "4px",
              padding: "2px 8px",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        onClick={dismiss}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#0a0a0a",
          background: "#22c55e",
          border: "none",
          borderRadius: "4px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Rozumím →
      </button>
    </div>
  );
}
