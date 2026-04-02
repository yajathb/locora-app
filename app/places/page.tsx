"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import PlaceCard from "@/components/PlaceCard";
import { Place } from "@/types/index";
import { getPlaces } from "@/lib/api";
import { useEffect } from "react";

export default function PlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaces = async () => {
      const data = await getPlaces();
      setPlaces(data);
      setLoading(false);
    };
    loadPlaces();
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || place.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [places, searchQuery, selectedCategory]);

  const categories = Array.from(new Set(places.map((p) => p.category)));

  return (
    <main style={{ backgroundColor: "var(--bg-paper)" }}>
      <section style={{ backgroundColor: "var(--brand-steel)" }} className="py-14">
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
            Places in Brentwood
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
            Curated restaurants, trails, events, and local businesses.
          </p>
          <SearchBar onSearch={setSearchQuery} placeholder="Search places..." />
        </div>
      </section>

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
                  <div key={i} style={{ backgroundColor: "var(--brand-fog)" }} className="rounded h-64 animate-pulse" />
                ))}
              </div>
            ) : filteredPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-16 rounded border"
                style={{ backgroundColor: "var(--brand-fog)", borderColor: "var(--brand-rule)" }}
              >
                <MapPin className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--brand-mist)" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "22px",
                    fontWeight: 300,
                    color: "var(--brand-ink)",
                    marginBottom: "6px",
                  }}
                >
                  No places found
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "var(--brand-slate)" }}>
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
            {filteredPlaces.length > 0 && (
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
                Showing {filteredPlaces.length} place{filteredPlaces.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
