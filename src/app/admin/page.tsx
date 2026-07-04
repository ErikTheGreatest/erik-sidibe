"use client";

import { useState, useEffect } from "react";
import { supabase, type ContactMessage, type Project } from "@/lib/supabase";

const ADMIN_PASSWORD = "erik2024";
type Tab = "zpravy" | "projekty";

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

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_authed");
    if (saved === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      fetchMessages();
      fetchProjects();
    }
  }, [authed]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
    setPasswordInput("");
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

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
      m.message.toLowerCase().includes(msgSearch.toLowerCase())
  );

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleString("cs-CZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";

  const inputSt: React.CSSProperties = {
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid #2a2a2a",
    borderRadius: "4px",
    padding: "0.7rem 0.9rem",
    fontFamily: "var(--font-inter)",
    fontSize: "0.85rem",
    color: "#f5f5f5",
    outline: "none",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ background: "#0f0f0f", border: "1px solid #1f1f1f", borderRadius: "8px", padding: "2.5rem", width: "100%", maxWidth: "360px" }}>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 700, color: "#f5f5f5", marginBottom: "0.5rem" }}>
            Erik<span style={{ color: "#22c55e" }}>.</span> Admin
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "#737373", marginBottom: "1.75rem" }}>Zadejte heslo</p>
          <input
            type="password"
            value={passwordInput}
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
            <button style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 600, color: "#0a0a0a", background: "#22c55e", border: "none", borderRadius: "4px", padding: "0.6rem 1.25rem", cursor: "pointer" }}>
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
                    <button style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#a3a3a3", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "0.3rem 0.75rem", cursor: "pointer" }}>Upravit</button>
                    <button onClick={() => deleteProject(p.id)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "#ef4444", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "4px", padding: "0.3rem 0.75rem", cursor: "pointer" }}>Smazat</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
