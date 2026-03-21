"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/components/DarkModeProvider";
import PlusDropdown from "@/components/PlusDropdown";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

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
          {/* Wordmark — Cormorant Garamond, white, per brandkit */}
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

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              style={{
                color: "var(--brand-mist)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link
              href="/places"
              style={{
                color: "var(--brand-mist)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Places
            </Link>
            <Link
              href="/"
              style={{
                color: "var(--brand-mist)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
              className="hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

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
                <Moon
                  className="w-5 h-5"
                  style={{ color: "var(--brand-mist)" }}
                />
              )}
            </button>

            <PlusDropdown />

            <div className="md:hidden">
              <button
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-2 rounded-lg transition-colors duration-200"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span
                    style={{ backgroundColor: "var(--brand-mist)" }}
                    className="h-0.5 w-full"
                  ></span>
                  <span
                    style={{ backgroundColor: "var(--brand-mist)" }}
                    className="h-0.5 w-full"
                  ></span>
                  <span
                    style={{ backgroundColor: "var(--brand-mist)" }}
                    className="h-0.5 w-full"
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
