"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import PlaceCard from "@/components/PlaceCard";
import { Event, Place } from "@/types/index";
import { getFeaturedEvents, getFeaturedPlaces } from "@/lib/api";
import { useLocation } from "@/app/LocationProvider";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { city } = useLocation();

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
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
        className="py-16 md:py-24 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div
              style={{
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 animate-fade-in"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Welcome to {city}'s Discovery Hub
              </span>
            </div>
            <h1
              style={{ color: "var(--text-primary)" }}
              className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up animate-delay-1"
            >
              Discover What's Happening in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {city}
              </span>
            </h1>
            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-xl max-w-2xl mx-auto animate-fade-in-up animate-delay-2"
            >
              Your window into events, places, and opportunities happening right
              now. Stay connected to your community.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 animate-fade-in-up animate-delay-3">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search events, places, opportunities..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl animate-fade-in-up animate-delay-4 hover-scale"
              style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
            >
              <Calendar className="w-5 h-5" />
              Explore Events
            </Link>
            <Link
              href="/places"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                borderColor: "var(--border-color)",
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 hover:opacity-80 transition animate-fade-in-up animate-delay-5 hover-scale"
            >
              <MapPin className="w-5 h-5" />
              Discover Places
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section
        style={{ backgroundColor: "var(--bg-primary)" }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="animate-fade-in-up">
              <h2
                style={{ color: "var(--text-primary)" }}
                className="text-3xl font-bold"
              >
                Featured Events
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Don't miss what's happening around {city}
              </p>
            </div>
            <Link
              href="/events"
              style={{ color: "var(--text-primary)" }}
              className="hidden md:flex items-center gap-2 hover:opacity-80 font-semibold transition animate-fade-in-up"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                  className="rounded-xl h-96 animate-pulse"
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
              style={{ color: "var(--text-primary)" }}
              className="inline-flex items-center gap-2 hover:opacity-80 font-semibold transition"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
        className="py-16 border-t"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="animate-fade-in-up">
              <h2
                style={{ color: "var(--text-primary)" }}
                className="text-3xl font-bold"
              >
                Popular Places
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Explore the best spots in {city}
              </p>
            </div>
            <Link
              href="/places"
              style={{ color: "var(--text-primary)" }}
              className="hidden md:flex items-center gap-2 hover:opacity-80 font-semibold transition animate-fade-in-up"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                  className="rounded-xl h-64 animate-pulse"
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
              style={{ color: "var(--text-primary)" }}
              className="inline-flex items-center gap-2 hover:opacity-80 font-semibold transition"
            >
              View All Places
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
        className="py-16 border-t"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{ color: "var(--text-primary)" }}
            className="text-3xl font-bold mb-4 animate-fade-in-up"
          >
            About Locora
          </h2>
          <p
            style={{ color: "var(--text-secondary)" }}
            className="text-lg mb-6 animate-fade-in-up animate-delay-1"
          >
            Information about {city} shouldn't be scattered across outdated
            websites and disconnected pages. Locora brings everything
            together—events, places, and opportunities—into one clean,
            easy-to-use platform that helps you stay engaged with your
            community.
          </p>
          <p
            style={{ color: "var(--text-secondary)" }}
            className="animate-fade-in-up animate-delay-2"
          >
            Whether you're looking for the next big event, discovering a new
            favorite spot, or finding ways to get involved, Locora is your
            window into what's happening in {city}
            right now.
          </p>
        </div>
      </section>
    </main>
  );
}
