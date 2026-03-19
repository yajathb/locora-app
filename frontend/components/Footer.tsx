"use client";

import Link from "next/link";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { useLocation } from "@/app/LocationProvider";

export default function Footer() {
  const { city } = useLocation();

  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-secondary)",
      }}
      className="mt-16 transition-colors duration-300 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              style={{ color: "var(--text-primary)" }}
              className="font-bold text-lg mb-4"
            >
              Locora
            </h3>
            <p className="text-sm">
              Your window into what's happening in {city} right now. Discover
              events, places, and opportunities.
            </p>
          </div>
          <div>
            <h4
              style={{ color: "var(--text-primary)" }}
              className="font-semibold mb-4"
            >
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/events"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/places"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Places
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              style={{ color: "var(--text-primary)" }}
              className="font-semibold mb-4"
            >
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              style={{ color: "var(--text-primary)" }}
              className="font-semibold mb-4"
            >
              Follow
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{ borderColor: "var(--border-color)" }}
          className="border-t pt-8"
        >
          <p className="text-center text-sm">
            © 2026 Locora. Celebrating {city}'s vibrant community.
          </p>
        </div>
      </div>
    </footer>
  );
}
