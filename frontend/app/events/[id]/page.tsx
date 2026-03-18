"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import CategoryBadge from "@/components/CategoryBadge";
import DetailSection from "@/components/DetailSection";
import { Event } from "@/types/index";
import { getEventById, formatDate, formatTime } from "@/lib/api";

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await getEventById(params.id as string);
      if (data) {
        setEvent(data);
      } else {
        setError(true);
      }
      setLoading(false);
    };
    loadEvent();
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

  if (error || !event) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Event Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The event you're looking for doesn't exist.
          </p>
          <Link
            href="/events"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
          >
            Back to Events
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
          href="/events"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden">
          {/* Image */}
          <div className="w-full h-96 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 flex-1">
                  {event.title}
                </h1>
                <CategoryBadge category={event.category} />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <DetailSection
                title="Date"
                icon={<Calendar />}
                content={formatDate(event.date)}
              />
              <DetailSection
                title="Time"
                icon={<Clock />}
                content={
                  <>
                    {formatTime(event.time)}
                    {event.endTime && ` - ${formatTime(event.endTime)}`}
                  </>
                }
              />
              <DetailSection
                title="Location"
                icon={<MapPin />}
                content={
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-50">
                      {event.location}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {event.address}
                    </div>
                  </div>
                }
              />
              <DetailSection
                title="Organizer"
                icon={<User />}
                content={event.organizer}
              />
            </div>

            {/* Links */}
            {event.weblink && (
              <div className="mb-6">
                <a
                  href={event.weblink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition"
                >
                  Learn More
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}

            {/* Location Map Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                Getting There
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {event.location} is located at {event.address}. Check the
                organizer's website for parking and accessibility information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
