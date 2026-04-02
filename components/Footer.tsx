"use client";

import Link from "next/link";

export default function Footer() {

  return (
    <footer
      style={{
        backgroundColor: "var(--brand-navy)",
        borderColor: "rgba(59,120,176,0.3)",
      }}
      className="mt-16 border-t transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Wordmark block */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "32px",
                fontWeight: 300,
                letterSpacing: "0.03em",
                color: "#ffffff",
                lineHeight: 1,
                display: "block",
                marginBottom: "6px",
              }}
            >
              Locora
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brand-slate)",
              }}
            >
              Brentwood, California
            </span>
          </div>

          {/* Nav links */}
          <div className="flex gap-10">
            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--brand-mist)",
                  marginBottom: "12px",
                }}
              >
                Explore
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/events"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      color: "var(--brand-slate)",
                    }}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/places"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      color: "var(--brand-slate)",
                    }}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Places
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--brand-mist)",
                  marginBottom: "12px",
                }}
              >
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      color: "var(--brand-slate)",
                    }}
                    className="hover:text-white transition-colors duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "12px",
                      color: "var(--brand-slate)",
                    }}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rule + copyright */}
        <div
          style={{ borderColor: "rgba(59,120,176,0.3)" }}
          className="border-t pt-6"
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brand-slate)",
              textAlign: "center",
            }}
          >
            © 2026 Locora · Brentwood, California
          </p>
        </div>
      </div>
    </footer>
  );
}
