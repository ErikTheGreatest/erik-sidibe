"use client";

import { useState, useEffect } from "react";
import { supabase, type ContactMessage, type Project } from "@/lib/supabase";

const ADMIN_PASSWORD = "erik2024";
type Tab = "zpravy" | "projekty";

type ProjectForm = {
  slug: string;
  name: string;
  category: string;
  year: string;
  description: string;
  challenge: string;
  featuresRaw: string;
  techRaw: string;
  image_url: string;
  accent: string;
};

const emptyForm = (): ProjectForm => ({
  slug: "",
  name: "",
  category: "",
  year: new Date().getFullYear().toString(),
  description: "",
  challenge: "",
  featuresRaw: "",
  techRaw: "",
  image_url: "",
  accent: "#22c55e",
});

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<Tab>("zpravy");

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [msgLoading, setMsgLoading] = useState(true);
  const [msgSearch, setMsgSearch] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [projLoading, setProjLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm());
  const [formError, setFormError] = useState("");
  const [formSaving, setFormSaving] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_authed");
    if (saved === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) { fetchMessages(); fetchProjects(); }
  }, [authed]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true); setAuthError(false);
    } else { setAuthError(true); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false); setPasswordInput("");
  };

  const fetchMessages = async () => {
    setMsgLoading(true);
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data as ContactMessage[]);
    setMsgLoading(false);
  };

  const fetchProjects = async () => {
    setProjLoading(true);
    const { data } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (data) setProjects(data as Project[]);
    setProjLoading(false);
  };

  const deleteMessage = async (id?: number) => {
    if (!id || !confirm("Smazat tuto zprávu?")) return;
    await supabase.from("contacts").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const deleteProject = async (id?: number) => {
    if (!id || !confirm("Smazat tento projekt?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id ?? null);
    setForm({
      slug: p.slug,
      name: p.name,
      category: p.category,
      year: p.year,
      description: p.description,
      challenge: p.challenge,
      featuresRaw: p.features.join(", "),
      techRaw: p.tech.join(", "),
      image_url: p.image_url,
      accent: p.accent,
    });
    setFormError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.category.trim() || !form.description.trim()) {
      setFormError("Vyplňte povinná pole: název, slug, kategorie, popis.");
      return;
    }
    setFormSaving(true);
    setFormError("");

    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      category: form.category.trim(),
      year: form.year.trim(),
      description: form.description.trim(),
      challenge: form.challenge.trim(),
      features: form.featuresRaw.split(",").map((s) => s.trim()).filter(Boolean),
      tech: form.techRaw.split(",").map((s) => s.trim()).filter(Boolean),
      image_url: form.image_url.trim(),
      accent: form.accent,
    };

    if (editingId) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
      if (error) { setFormError("Chyba: " + error.message); setFormSaving(false); return; }
    } else {
      const maxOrder = projects.length > 0 ? Math.max(...projects.map((p) => p.sort_order)) + 1 : 1;
      const { error } = await supabase.from("projects").insert([{ ...payload, sort_order: maxOrder }]);
      if (error) { setFormError("Chyba: " + error.message); setFormSaving(false); return; }
    }

    await fetchProjects();
    setShowForm(false);
    setFormSaving(false);
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(msgSearch.toLowerCase())
  );

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";

  const inputSt: React.CSSProperties = {
    width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a",
    borderRadius: "4px", padding: "0.7rem 0.9rem",
    fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#f5f5f5", outline: "none",
  };

  const labelSt: React.CSSProperties = {
    display: "block", fontFamily: "var(--font-inter)", fontSize: "0.72rem",
    fontWeight: 500, color: "#737373", marginBottom: "0.35rem",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "360px" }}>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "0.5rem" }}>
            Erik<span style={{ color: "#22c55e" }}>.</span> Admin
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#737373", marginBottom: "1.75rem" }}>Zadejte heslo</p>
          <input type="password" value={passwordInput}
            onChange={(e) => { setPasswordInput(e.target.value); setAuthError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Heslo"
            style={{ ...inputSt, marginBottom: authError ? "0.4rem" : "1.25rem", border: `1px solid ${authError ? "#ef4444" : "#2a2a2a"}` }}
          />
          {authError && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", marginBottom: "1rem" }}>Nesprávné heslo</p>}
          <button onClick={handleLogin} style={{ width: "100%", fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", border: "none", borderRadius: "4px", padding: "0.75rem", cursor: "pointer" }}>
            Přihlásit se
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 700, color: "#f5f5f5" }}>
          Erik<span style={{ color: "#22c55e" }}>.</span> Admin
        </p>
        <button onClick={handleLogout} style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#a3a3a3", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.5rem 1rem", cursor: "pointer" }}>
          Odhlásit se
        </button>
      </div>

      <div style={{ display: "flex", marginBottom: "2rem", border: "1px solid #1f1f1f", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
        {(["zpravy", "projekty"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 500, color: tab === t ? "#0a0a0a" : "#737373", background: tab === t ? "#22c55e" : "#0f0f0f", border: "none", padding: "0.6rem 1.5rem", cursor: "pointer" }}>
            {t === "zpravy" ? `Zprávy (${messages.length})` : `Projekty (${projects.length})`}
          </button>
        ))}
      </div>

      {/* ZPRÁVY */}
      {tab === "zpravy" && (
        <>
          <input type="text" value={msgSearch} onChange={(e) => setMsgSearch(e.target.value)} placeholder="Hledat..." style={{ ...inputSt, marginBottom: "1.25rem" }} />
          {msgLoading ? (
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#525252" }}>Načítám...</p>
          ) : filteredMessages.length === 0 ? (
            <div style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "3rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#525252" }}>Žádné zprávy.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filteredMessages.map((msg) => (
                <div key={msg.id} style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#f5f5f5" }}>{msg.name}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#22c55e" }}>{msg.email}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#525252" }}>{formatDate(msg.created_at)}</p>
                      <button onClick={() => deleteMessage(msg.id)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "#ef4444", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px", padding: "0.3rem 0.6rem", cursor: "pointer" }}>Smazat</button>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#a3a3a3", lineHeight: 1.6 }}>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* PROJEKTY */}
      {tab === "projekty" && (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
            <button onClick={openNew} style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", border: "none", borderRadius: "4px", padding: "0.6rem 1.25rem", cursor: "pointer" }}>
              + Přidat projekt
            </button>
          </div>
          {projLoading ? (
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#525252" }}>Načítám...</p>
          ) : projects.length === 0 ? (
            <div style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "3rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "#525252" }}>Žádné projekty.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {projects.map((p) => (
                <div key={p.id} style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "6px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "#f5f5f5" }}>{p.name}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#525252" }}>{p.category} · {p.year}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => openEdit(p)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#a3a3a3", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.3rem 0.75rem", cursor: "pointer" }}>Upravit</button>
                    <button onClick={() => deleteProject(p.id)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px", padding: "0.3rem 0.75rem", cursor: "pointer" }}>Smazat</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* FORMULÁŘ OVERLAY */}
      {showForm && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1rem", overflowY: "auto" }}
        >
          <div style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "2rem", width: "100%", maxWidth: "600px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f5" }}>
                {editingId ? "Upravit projekt" : "Nový projekt"}
              </p>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#525252", fontSize: "1.25rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelSt}>Název *</label>
                  <input style={inputSt} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Název projektu" />
                </div>
                <div>
                  <label style={labelSt}>Slug * (URL)</label>
                  <input style={inputSt} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="nazev-projektu" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelSt}>Kategorie *</label>
                  <input style={inputSt} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="E-commerce & Restaurace" />
                </div>
                <div>
                  <label style={labelSt}>Rok</label>
                  <input style={inputSt} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
                </div>
              </div>

              <div>
                <label style={labelSt}>Popis *</label>
                <textarea style={{ ...inputSt, resize: "vertical" }} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Popis projektu..." />
              </div>

              <div>
                <label style={labelSt}>Výzva projektu</label>
                <textarea style={{ ...inputSt, resize: "vertical" }} rows={2} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} placeholder="Hlavní výzva a řešení..." />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={labelSt}>Funkce (oddělené čárkou)</label>
                  <input style={inputSt} value={form.featuresRaw} onChange={(e) => setForm({ ...form, featuresRaw: e.target.value })} placeholder="Admin panel, Galerie, ..." />
                </div>
                <div>
                  <label style={labelSt}>Tech stack (oddělené čárkou)</label>
                  <input style={inputSt} value={form.techRaw} onChange={(e) => setForm({ ...form, techRaw: e.target.value })} placeholder="Next.js 14, Supabase, ..." />
                </div>
              </div>

              <div>
                <label style={labelSt}>URL obrázku</label>
                <input style={inputSt} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://images.unsplash.com/..." />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div>
                  <label style={labelSt}>Akcentní barva</label>
                  <input type="color" value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })}
                    style={{ width: "48px", height: "36px", border: "1px solid #2a2a2a", borderRadius: "4px", background: "#0a0a0a", cursor: "pointer", padding: "2px" }} />
                </div>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "#525252", marginTop: "1.1rem" }}>{form.accent}</p>
              </div>

              {formError && (
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", padding: "0.6rem 0.9rem" }}>
                  {formError}
                </p>
              )}

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.25rem" }}>
                <button onClick={() => setShowForm(false)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#737373", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.65rem 1.25rem", cursor: "pointer" }}>
                  Zrušit
                </button>
                <button onClick={handleSave} disabled={formSaving} style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", border: "none", borderRadius: "4px", padding: "0.65rem 1.5rem", cursor: formSaving ? "not-allowed" : "pointer", opacity: formSaving ? 0.7 : 1 }}>
                  {formSaving ? "Ukládám..." : "Uložit projekt"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
