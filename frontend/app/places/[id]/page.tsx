"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import CategoryBadge from "@/components/CategoryBadge";
import DetailSection from "@/components/DetailSection";
import { Place } from "@/types";
import { getPlaceById } from "@/lib/api";

export default function PlaceDetailPage() {
  const params = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPlace = async () => {
      const data = await getPlaceById(params.id as string);
      if (data) { setPlace(data); } else { setError(true); }
      setLoading(false);
    };
    loadPlace();
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

  if (error || !place) {
    return (
      <main style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: 300, color: "var(--brand-ink)", marginBottom: "8px" }}>
            Place Not Found
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "var(--brand-slate)", marginBottom: "20px" }}>
            The place you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/places" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)" }} className="hover:opacity-80 transition">
            ← Back to Places
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/places"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)" }}
          className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Places
        </Link>

        <div style={{ backgroundColor: "#ffffff", borderColor: "var(--brand-rule)" }} className="rounded border overflow-hidden">
          {/* Image */}
          <div style={{ backgroundColor: "var(--brand-steel)" }} className="w-full h-80 overflow-hidden relative">
            <Image
              src={place.image}
              alt={place.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brand-sky)", marginBottom: "8px" }}>
                    {place.category}
                  </p>
                  <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: "var(--brand-ink)", lineHeight: 1.15 }}>
                    {place.name}
                  </h1>
                </div>
                <CategoryBadge category={place.category} />
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 300, color: "var(--brand-slate)", lineHeight: 1.7 }}>
                {place.description}
              </p>
            </div>

            <div style={{ borderColor: "var(--brand-rule)" }} className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
              {place.address && <DetailSection title="Address" icon={<MapPin />} content={place.address} />}
              {place.phone && (
                <DetailSection title="Phone" icon={<Phone />} content={
                  <a href={`tel:${place.phone}`} style={{ color: "var(--brand-sky)" }} className="hover:opacity-80 transition">{place.phone}</a>
                } />
              )}
              {place.hours && <DetailSection title="Hours" icon={<Clock />} content={place.hours} />}
            </div>

            {/* CTAs — Navy primary, Fog secondary per brandkit detail screen */}
            <div className="flex gap-3 flex-wrap mb-8">
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "var(--brand-navy)", color: "#ffffff", fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "12px 24px", borderRadius: "4px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  className="hover:opacity-90 transition"
                >
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {place.phone && (
                <a
                  href={`tel:${place.phone}`}
                  style={{ backgroundColor: "var(--brand-fog)", color: "var(--brand-steel)", fontFamily: "var(--font-dm-sans)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "12px 24px", borderRadius: "4px", border: "0.5px solid var(--brand-mist)", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  className="hover:opacity-80 transition"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              )}
            </div>

            {/* Info box */}
            <div style={{ backgroundColor: "var(--brand-fog)", borderLeft: "2px solid var(--brand-sky)", borderRadius: "0 6px 6px 0", padding: "16px 20px" }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--brand-sky)", marginBottom: "6px" }}>
                Quick Info
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "var(--brand-steel)", lineHeight: 1.65 }}>
                {place.name} is a great spot to visit in Brentwood. Check their website for the latest hours, events, and special offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
