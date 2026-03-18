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

      const matchesCategory =
        !selectedCategory || place.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [places, searchQuery, selectedCategory]);

  const categories = Array.from(new Set(places.map((p) => p.category)));

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
              Places in Brentwood
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore the best spots, cafes, restaurants, and attractions around
            Brentwood.
          </p>
          <SearchBar onSearch={setSearchQuery} placeholder="Search places..." />
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

          {/* Places Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                  No places found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
              </div>
            )}
            {filteredPlaces.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
                Showing {filteredPlaces.length} place
                {filteredPlaces.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
