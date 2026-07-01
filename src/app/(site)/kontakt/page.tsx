"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function KontaktPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Jméno je povinné";
    if (!form.email.trim()) newErrors.email = "E-mail je povinný";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Zadejte platný e-mail";
    if (!form.message.trim()) newErrors.message = "Zpráva je povinná";
    else if (form.message.trim().length < 10)
      newErrors.message = "Zpráva musí mít alespoň 10 znaků";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("contacts").insert([
        { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() },
      ]);
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field: keyof FormState) => ({
    width: "100%",
    background: "#0f0f0f",
    border: `1px solid ${errors[field] ? "#ef4444" : "#2a2a2a"}`,
    borderRadius: "4px",
    padding: "0.875rem 1rem",
    fontFamily: "var(--font-inter)",
    fontSize: "0.9rem",
    color: "#f5f5f5",
    outline: "none",
    transition: "border-color 0.2s",
  });

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
              Kontakt
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
            Napište mi
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1.05rem",
              color: "#737373",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            Máte projekt nebo otázku? Napište mi — odpovím do 24 hodin.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#0a0a0a", padding: "5rem 1.5rem 7rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#525252",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Kontaktní údaje
            </p>

            {[
              { label: "E-mail", value: "eriksidibe.dev@gmail.com" },
              { label: "Lokalita", value: "Česká republika" },
              { label: "Dostupnost", value: "Otevřen novým projektům" },
              { label: "Odpověď do", value: "24 hodin" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 0",
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
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: item.label === "Dostupnost" ? "#22c55e" : "#d4d4d4",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: "2.5rem",
                background: "#0f0f0f",
                border: "1px solid #1f1f1f",
                borderLeft: "2px solid #22c55e",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.85rem",
                  color: "#a3a3a3",
                  lineHeight: 1.6,
                }}
              >
                Typicky pracuji na projektech v rozsahu 1–4 týdnů. Cena se odvíjí od
                složitosti — napište mi co potřebujete a připravím cenovou nabídku.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              background: "#0f0f0f",
              border: "1px solid #1f1f1f",
              padding: "2.5rem",
            }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    fontSize: "1.25rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#f5f5f5",
                    marginBottom: "0.75rem",
                  }}
                >
                  Zpráva odeslána!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9rem",
                    color: "#737373",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  Děkuji za zprávu. Ozvu se vám do 24 hodin.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#22c55e",
                    background: "none",
                    border: "1px solid #22c55e",
                    borderRadius: "4px",
                    padding: "0.6rem 1.25rem",
                    cursor: "pointer",
                  }}
                >
                  Odeslat další zprávu
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#525252",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  Formulář
                </p>

                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#a3a3a3",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Jméno
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Jan Novák"
                    style={inputStyle("name")}
                  />
                  {errors.name && (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#a3a3a3",
                      marginBottom: "0.4rem",
                    }}
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="jan@firma.cz"
                    style={inputStyle("email")}
                  />
                  {errors.email && (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#a3a3a3",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Zpráva
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Popište váš projekt nebo otázku..."
                    rows={5}
                    style={{ ...inputStyle("message"), resize: "vertical" }}
                  />
                  {errors.message && (
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8rem",
                      color: "#ef4444",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "4px",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    Něco se pokazilo. Zkuste to prosím znovu.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#0a0a0a",
                    background: status === "loading" ? "#16a34a" : "#22c55e",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.875rem",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "opacity 0.2s",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "Odesílám..." : "Odeslat zprávu →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
