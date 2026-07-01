"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/projekty", label: "Projekty" },
  { href: "/sluzby", label: "Služby" },
  { href: "/o-mne", label: "O mně" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const darkHeroPages = ["/"];
  const isTransparent = darkHeroPages.includes(pathname) && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s, box-shadow 0.3s",
        background: isTransparent ? "transparent" : "#0a0a0a",
        borderBottom: isTransparent ? "none" : "1px solid #1f1f1f",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.01em",
            }}
          >
            Erik<span style={{ color: "#22c55e" }}>.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: "2rem", alignItems: "center" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#22c55e" : "#d4d4d4",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                  borderBottom: isActive ? "1px solid #22c55e" : "none",
                  paddingBottom: "2px",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#f5f5f5",
                transition: "transform 0.2s",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#0d0d0d",
            borderTop: "1px solid #1f1f1f",
            padding: "1rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#22c55e" : "#d4d4d4",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
