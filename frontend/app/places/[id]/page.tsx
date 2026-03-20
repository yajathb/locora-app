"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Globe,
  ExternalLink,
} from "lucide-react";
import CategoryBadge from "@/components/CategoryBadge";
import DetailSection from "@/components/DetailSection";
import { Place } from "@/types/index";
import { getPlaceById } from "@/lib/api";

export default function PlaceDetailPage() {
  const params = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPlace = async () => {
      const data = await getPlaceById(params.id as string);
      if (data) {
        setPlace(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    loadPlace();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 animate-pulse">
            <div className="h-96 rounded-lg mb-8" style={{backgroundColor: "var(--bg-tertiary)"}} />
            <div className="h-8 rounded w-3/4 mb-4" style={{backgroundColor: "var(--bg-tertiary)"}} />
            <div className="h-6 rounded w-1/2" style={{backgroundColor: "var(--bg-tertiary)"}} />
          </div>
        </div>
      </main>
    );
  }

  if (error || !place) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Place Not Found
          </h1>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            The place you're looking for doesn't exist.
          </p>
          <Link
            href="/places"
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Back to Places
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <Link
          href="/places"
          className="inline-flex items-center gap-2 font-semibold mb-6 transition"
          style={{ color: "var(--text-primary)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Places
        </Link>

        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
          {/* Image */}
          <div className="w-full h-96 overflow-hidden" style={{ backgroundColor: "var(--bg-tertiary)" }}>
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {place.name}
                </h1>
                <CategoryBadge category={place.category} />
              </div>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                {place.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b" style={{ borderColor: "var(--border-color)" }}>
              {place.address && (
                <DetailSection
                  title="Address"
                  icon={<MapPin />}
                  content={place.address}
                />
              )}
              {place.phone && (
                <DetailSection
                  title="Phone"
                  icon={<Phone />}
                  content={
                    <a
                      href={`tel:${place.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      {place.phone}
                    </a>
                  }
                />
              )}
              {place.hours && (
                <DetailSection
                  title="Hours"
                  icon={<Clock />}
                  content={place.hours}
                />
              )}
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition"
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {place.phone && (
                <a
                  href={`tel:${place.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-lg p-6 border" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
              <h3 className="font-semibold mb-2">
                Quick Info
              </h3>
              <p className="text-sm">
                {place.name} is a great spot to visit in Brentwood. Check their
                website for the latest hours, events, and special offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
