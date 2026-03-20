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
      <main
        className="min-h-screen"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div
            className="rounded-lg p-8 animate-pulse"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div
              className="h-96 rounded-lg mb-8"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            />
            <div
              className="h-8 rounded w-3/4 mb-4"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            />
            <div
              className="h-6 rounded w-1/2"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            />
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <div className="text-center">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Event Not Found
          </h1>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
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
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 font-semibold mb-6 transition hover:opacity-80"
          style={{ color: "var(--text-primary)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </Link>

        <div
          className="rounded-xl overflow-hidden shadow-lg"
          style={{
            backgroundColor: "var(--bg-secondary)",
            boxShadow: `var(--box-shadow-default)`,
          }}
        >
          {/* Image */}
          <div
            className="w-full h-96 overflow-hidden"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
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
                <h1 className="text-4xl font-bold flex-1" style={{color: "var(--text-primary)"}}>
                  {event.title}
                </h1>
                <CategoryBadge category={event.category} />
              </div>
              <p className="text-lg" style={{color: "var(--text-secondary)"}}>
                {event.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b" style={{ borderColor: "var(--border-color)" }}>
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
                    <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {event.location}
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
                  className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold transition"
                  style={{color: "var(--text-primary)", backgroundColor: "var(--bg-primary)" }}
                >
                  Learn More
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}

            {/* Location Map Info */}
            <div className="rounded-lg p-6 border" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-tertiary)" }}>
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Getting There
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
