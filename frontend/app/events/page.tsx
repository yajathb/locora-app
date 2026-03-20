"use client";

import { useState, useMemo } from "react";
import { Calendar, MapPin } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/index";
import { getEvents } from "@/lib/api";
import { useEffect } from "react";
import { useLocation } from "@/app/LocationProvider";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { city } = useLocation();

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !searchQuery ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <section
        className="border-b"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8" style={{ backgroundColor: "var(--bg-tertiary)" }} />
            <h1 className="text-3xl md:text-4xl font-bold " style={{ color: "var(--text-primary)" }}>
              Events in {city}
            </h1>
          </div>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            Discover what's happening around {city}. Find events that match
            your interests.
          </p>
          <SearchBar onSearch={setSearchQuery} placeholder="Search events..." />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Events Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl h-96 animate-pulse"
                    style={{ backgroundColor: "var(--bg-tertiary)" }}
                  />
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 rounded-lg border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Calendar
                  className="w-12 h-12 mx-auto mb-3"
                  style={{ color: "var(--text-secondary)" }}
                />
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  No events found
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
              </div>
            )}
            {filteredEvents.length > 0 && (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Showing {filteredEvents.length} event
                {filteredEvents.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
