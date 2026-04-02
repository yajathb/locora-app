"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, Moon, Sun, Menu, X } from "lucide-react";
import { useDarkMode } from "@/components/DarkModeProvider";
import PlusDropdown from "@/components/PlusDropdown";
import { useState } from "react";

export default function Navbar() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "var(--brand-navy)",
        borderColor: "rgba(59,120,176,0.3)",
        color: "#ffffff",
      }}
      className="sticky top-0 z-50 transition-colors duration-300 border-b animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link href="/" className="flex items-center group">
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "28px",
                fontWeight: 300,
                letterSpacing: "0.03em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              Locora
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              style={{ color: "var(--brand-mist)", fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, letterSpacing: "0.02em" }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link
              href="/places"
              style={{ color: "var(--brand-mist)", fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, letterSpacing: "0.02em" }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Places
            </Link>
            <Link
              href="/"
              style={{ color: "var(--brand-mist)", fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, letterSpacing: "0.02em" }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              className="p-2 rounded-lg transition-colors duration-200 hover-scale"
              suppressHydrationWarning
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" style={{ color: "var(--brand-mist)" }} />
              )}
            </button>

            <PlusDropdown />

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5" style={{ color: "var(--brand-mist)" }} />
                : <Menu className="w-5 h-5" style={{ color: "var(--brand-mist)" }} />
              }
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: "var(--brand-steel)",
            borderTop: "0.5px solid rgba(59,120,176,0.3)",
          }}
          className="md:hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {[
              { href: "/events", icon: <Calendar className="w-4 h-4" />, label: "Events" },
              { href: "/places", icon: <MapPin className="w-4 h-4" />,   label: "Places" },
              { href: "/",       icon: <Users className="w-4 h-4" />,    label: "Community" },
            ].map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: "var(--brand-mist)",
                  borderBottom: "0.5px solid rgba(59,120,176,0.2)",
                  padding: "14px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                className="hover:text-white transition-colors duration-200"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </nav>
  );
}