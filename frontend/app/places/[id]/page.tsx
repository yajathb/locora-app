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
      <main className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 animate-pulse">
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8" />
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !place) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Place Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The place you're looking for doesn't exist.
          </p>
          <Link
            href="/places"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
          >
            Back to Places
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <Link
          href="/places"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Places
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
          {/* Image */}
          <div className="w-full h-96 overflow-hidden bg-gray-200 dark:bg-gray-800">
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
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 flex-1">
                  {place.name}
                </h1>
                <CategoryBadge category={place.category} />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {place.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </a>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                Quick Info
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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
