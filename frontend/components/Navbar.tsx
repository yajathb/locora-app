"use client";

import Link from "next/link";
import { MapPin, Calendar, Users, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/app/DarkModeProvider";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition duration-300">
              Locora
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link
              href="/places"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Places
            </Link>
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Community
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 hover-scale"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div className="md:hidden">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-300"></span>
                  <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-300"></span>
                  <span className="h-0.5 w-full bg-gray-700 dark:bg-gray-300"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
