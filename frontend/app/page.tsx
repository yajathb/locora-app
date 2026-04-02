"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import PlaceCard from "@/components/PlaceCard";
import { Event, Place } from "@/types";
import { getFeaturedEvents, getFeaturedPlaces } from "@/lib/api";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      const [featuredEvents, featuredPlaces] = await Promise.all([
        getFeaturedEvents(),
        getFeaturedPlaces(),
      ]);
      setEvents(featuredEvents);
      setPlaces(featuredPlaces);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <main
      style={{ backgroundColor: "var(--bg-paper)", color: "var(--brand-ink)" }}
    >
      {/* Hero — Steel bg, editorial overlay per brandkit mockup */}
      <section
        style={{ backgroundColor: "var(--brand-steel)" }}
        className="relative py-24 md:py-32 overflow-hidden"
      >
        {/* Subtle overlay wash */}
        <div
          style={{ backgroundColor: "rgba(13,35,64,0.55)" }}
          className="absolute inset-0"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Overline — DM Sans, Sky, tracked uppercase */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--brand-mist)",
                marginBottom: "16px",
              }}
            >
              Brentwood, California
            </p>

            {/* Display heading — Cormorant Garamond Light */}
            <h1
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(44px, 6vw, 72px)",
                fontWeight: 300,
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                marginBottom: "16px",
              }}
            >
              The definitive guide
              <br />
              to your city.
            </h1>

            {/* Sky rule line */}
            <div
              style={{
                width: "36px",
                height: "0.5px",
                backgroundColor: "var(--brand-sky)",
                marginBottom: "20px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--brand-mist)",
                lineHeight: 1.7,
                marginBottom: "32px",
                maxWidth: "480px",
              }}
            >
              Curated events, places, and community moments in Brentwood. Discover
              with intention, not algorithms.
            </p>

            {/* Search */}
            <div className="mb-8 max-w-lg">
              <SearchBar onSearch={() => {}} placeholder="Search events, places, opportunities..." />
            </div>

            {/* CTAs — Navy primary, Fog secondary per brandkit detail page */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/events"
                style={{
                  backgroundColor: "var(--brand-navy)",
                  color: "#ffffff",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                className="hover:opacity-90 transition"
              >
                Explore Events
              </Link>
              <Link
                href="/places"
                style={{
                  backgroundColor: "#151E28",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  borderRadius: "4px",
                  border: "0.5px solid #151E28",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                className="hover:opacity-80 transition"
              >
                Discover Places
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section style={{ backgroundColor: "var(--bg-paper)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brand-sky)",
                  marginBottom: "8px",
                }}
              >
                Curated this week
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "var(--brand-ink)",
                  lineHeight: 1.1,
                }}
              >
                Featured Events
              </h2>
            </div>
            <Link
              href="/events"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
              }}
              className="hidden md:flex items-center gap-2 hover:opacity-80 transition"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: "var(--brand-fog)" }}
                  className="rounded h-80 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  featured={event.featured}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/events"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
              }}
              className="inline-flex items-center gap-2 hover:opacity-80 transition"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places — Sand bg for alternating section rhythm */}
      <section
        style={{
          backgroundColor: "var(--brand-sand)",
          borderColor: "var(--brand-rule)",
        }}
        className="py-16 border-t"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brand-sky)",
                  marginBottom: "8px",
                }}
              >
                Explore Brentwood
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "var(--brand-ink)",
                  lineHeight: 1.1,
                }}
              >
                Popular Places
              </h2>
            </div>
            <Link
              href="/places"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
              }}
              className="hidden md:flex items-center gap-2 hover:opacity-80 transition"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: "var(--brand-fog)" }}
                  className="rounded h-64 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/places"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
              }}
              className="inline-flex items-center gap-2 hover:opacity-80 transition"
            >
              View All Places <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About — Paper bg, editorial pull-quote style */}
      <section
        style={{
          backgroundColor: "var(--bg-paper)",
          borderColor: "var(--brand-rule)",
        }}
        className="py-16 border-t"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--brand-sky)",
              marginBottom: "12px",
            }}
          >
            About Locora
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "32px",
              fontWeight: 300,
              color: "var(--brand-ink)",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Locora exists to make Brentwood legible
            <br />
            to the people who live in it.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              fontWeight: 300,
              color: "var(--brand-slate)",
              lineHeight: 1.75,
              marginBottom: "12px",
            }}
          >
            Information about Brentwood shouldn&apos;t be scattered across outdated
            websites and disconnected pages. Locora brings everything together —
            events, places, and opportunities — into one curated platform.
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "18px",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--brand-slate)",
              lineHeight: 1.6,
            }}
          >
            &ldquo;One neighborhood, one standout place, one season at a time.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
