"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/app/DarkModeProvider";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <nav
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
      className="sticky top-0 z-50 shadow-sm transition-colors duration-300 border-b animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img src="/image-removebg-preview.png" alt="Locora Logo" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition duration-300">
              Locora
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              style={{ color: "var(--text-secondary)" }}
              className="hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link
              href="/places"
              style={{ color: "var(--text-secondary)" }}
              className="hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Places
            </Link>
            <Link
              href="/"
              style={{ color: "var(--text-secondary)" }}
              className="hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              className="p-2 rounded-lg transition-colors duration-200 hover-scale"
              suppressHydrationWarning
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div className="md:hidden">
              <button
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                className="p-2 rounded-lg transition-colors duration-200"
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span
                    style={{ backgroundColor: "var(--text-secondary)" }}
                    className="h-0.5 w-full"
                  ></span>
                  <span
                    style={{ backgroundColor: "var(--text-secondary)" }}
                    className="h-0.5 w-full"
                  ></span>
                  <span
                    style={{ backgroundColor: "var(--text-secondary)" }}
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
