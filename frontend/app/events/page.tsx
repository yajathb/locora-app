"use client";

import { useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/index";
import { getEvents } from "@/lib/api";
import { useEffect } from "react";
import { useLocation } from "@/components/LocationProvider";

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
    <main style={{ backgroundColor: "var(--bg-paper)" }}>
      {/* Header — Steel bg, editorial style */}
      <section
        style={{ backgroundColor: "var(--brand-steel)" }}
        className="py-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--brand-mist)",
              marginBottom: "10px",
            }}
          >
            Brentwood, California
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            Events in Brentwood
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "13px",
              fontWeight: 300,
              color: "var(--brand-mist)",
              marginBottom: "24px",
            }}
          >
            Discover what's happening. Find events that match your interests.
          </p>
          <SearchBar onSearch={setSearchQuery} placeholder="Search events..." />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: "var(--brand-fog)" }}
                    className="rounded h-80 animate-pulse"
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
                className="text-center py-16 rounded border"
                style={{
                  backgroundColor: "var(--brand-fog)",
                  borderColor: "var(--brand-rule)",
                }}
              >
                <Calendar
                  className="w-10 h-10 mx-auto mb-4"
                  style={{ color: "var(--brand-mist)" }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "22px",
                    fontWeight: 300,
                    color: "var(--brand-ink)",
                    marginBottom: "6px",
                  }}
                >
                  No events found
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    color: "var(--brand-slate)",
                  }}
                >
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
            {filteredEvents.length > 0 && (
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--brand-slate)",
                  marginTop: "16px",
                }}
              >
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
