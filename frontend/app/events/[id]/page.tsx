"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User, Clock, ExternalLink } from "lucide-react";
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
      if (data) { setEvent(data); } else { setError(true); }
      setLoading(false);
    };
    loadEvent();
  }, [params.id]);

  if (loading) {
    return (
      <main style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div style={{ backgroundColor: "var(--brand-fog)" }} className="rounded p-8 animate-pulse">
            <div style={{ backgroundColor: "var(--brand-mist)" }} className="h-80 rounded mb-8" />
            <div style={{ backgroundColor: "var(--brand-mist)" }} className="h-8 rounded w-3/4 mb-4" />
            <div style={{ backgroundColor: "var(--brand-mist)" }} className="h-5 rounded w-1/2" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: 300, color: "var(--brand-ink)", marginBottom: "8px" }}>
            Event Not Found
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--brand-slate)", marginBottom: "20px" }}>
            The event you're looking for doesn't exist.
          </p>
          <Link href="/events" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)" }} className="hover:opacity-80 transition">
            ← Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/events"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)" }}
          className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="rounded border overflow-hidden">
          {/* Image */}
          <div style={{ backgroundColor: "var(--brand-steel)" }} className="w-full h-80 overflow-hidden relative">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brand-sky)", marginBottom: "8px" }}>
                    {event.category}
                  </p>
                  <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: "var(--brand-ink)", lineHeight: 1.15 }}>
                    {event.title}
                  </h1>
                </div>
                <CategoryBadge category={event.category} />
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 300, color: "var(--brand-slate)", lineHeight: 1.7 }}>
                {event.description}
              </p>
            </div>

            <div style={{ borderColor: "var(--brand-rule)" }} className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
              <DetailSection title="Date" icon={<Calendar />} content={formatDate(event.date)} />
              <DetailSection title="Time" icon={<Clock />} content={<>{formatTime(event.time)}{event.endTime && ` — ${formatTime(event.endTime)}`}</>} />
              <DetailSection title="Location" icon={<MapPin />} content={
                <div>
                  <div style={{ color: "var(--brand-ink)", fontWeight: 500 }}>{event.location}</div>
                  <div style={{ color: "var(--brand-slate)", fontSize: "12px" }}>{event.address}</div>
                </div>
              } />
              <DetailSection title="Organizer" icon={<User />} content={event.organizer} />
            </div>

            {event.weblink && (
              <div className="mb-6">
                <a
                  href={event.weblink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "var(--brand-navy)", color: "#ffffff", fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "12px 24px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  className="hover:opacity-90 transition"
                >
                  Learn More <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Info box — Fog bg, Sky left-border per brandkit pull-quote style */}
            <div style={{ backgroundColor: "var(--brand-fog)", borderLeft: "2px solid var(--brand-sky)", borderRadius: "0 6px 6px 0", padding: "16px 20px" }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)", marginBottom: "6px" }}>
                Getting There
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "var(--brand-ink)", lineHeight: 1.65 }}>
                {event.location} is located at {event.address}. Check the organizer's website for parking and accessibility information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
