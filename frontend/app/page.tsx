"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import PlaceCard from "@/components/PlaceCard";
import { Event, Place } from "@/types/index";
import { getFeaturedEvents, getFeaturedPlaces } from "@/lib/api";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                Welcome to Brentwood's Discovery Hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Discover What's Happening in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Brentwood
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your window into events, places, and opportunities happening right
              now. Stay connected to your community.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search events, places, opportunities..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              Explore Events
            </Link>
            <Link
              href="/places"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg font-semibold border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <MapPin className="w-5 h-5" />
              Discover Places
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Featured Events
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Don't miss what's happening around Brentwood
              </p>
            </div>
            <Link
              href="/events"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
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
                  className="bg-gray-200 dark:bg-gray-800 rounded-xl h-96 animate-pulse"
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
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Popular Places
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Explore the best spots in Brentwood
              </p>
            </div>
            <Link
              href="/places"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
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
                  className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 animate-pulse"
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
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition"
            >
              View All Places
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            About Locora
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Information about Brentwood shouldn't be scattered across outdated
            websites and disconnected pages. Locora brings everything
            together—events, places, and opportunities—into one clean,
            easy-to-use platform that helps you stay engaged with your
            community.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Whether you're looking for the next big event, discovering a new
            favorite spot, or finding ways to get involved, Locora is your
            window into what's happening in Brentwood right now.
          </p>
        </div>
      </section>
    </main>
  );
}
