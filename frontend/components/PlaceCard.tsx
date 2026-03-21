"use client";

import Link from "next/link";
import { Place } from "@/types/index";
import { MapPin, Phone, Globe } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/places/${place.id}`}>
      <div className="group cursor-pointer animate-fade-in-up hover-lift">
        <div
          style={{
            backgroundColor: "var(--brand-sand)",
            borderColor: "var(--brand-rule)",
          }}
          className="rounded overflow-hidden h-full flex flex-col border hover:shadow-md transition-shadow duration-300"
        >
          {/* Image */}
          <div
            style={{ backgroundColor: "var(--brand-steel)" }}
            className="relative overflow-hidden h-40"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />
            {/* "Locora Pick" tag — bottom-left, per brandkit card anatomy */}
            {place.featured && (
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  backgroundColor: "rgba(13,35,64,0.78)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: "3px",
                }}
              >
                Locora Pick
              </div>
            )}
            <div className="absolute top-3 right-3">
              <CategoryBadge category={place.category} size="sm" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Overline */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
                marginBottom: "5px",
              }}
            >
              {place.category}
            </p>

            {/* Name — Cormorant, not bold */}
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "20px",
                fontWeight: 400,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "5px",
              }}
              className="line-clamp-1"
            >
              {place.name}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10.5px",
                color: "var(--brand-slate)",
                lineHeight: 1.65,
                marginBottom: "12px",
              }}
              className="line-clamp-2"
            >
              {place.description}
            </p>

            {/* Meta */}
            <div
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9.5px", color: "var(--brand-slate)" }}
              className="space-y-1 mb-3"
            >
              {place.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--brand-sky)" }} />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
              )}
              {place.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand-sky)" }} />
                  <span>{place.phone}</span>
                </div>
              )}
              {place.hours && (
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--brand-slate)", opacity: 0.7 }}>Hours:</span>
                  <span>{place.hours}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{ borderColor: "var(--brand-rule)" }}
              className="mt-auto pt-2 border-t flex items-center justify-between"
            >
              {place.website && <Globe className="w-3.5 h-3.5" style={{ color: "var(--brand-sky)" }} />}
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8.5px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--brand-sky)",
                  marginLeft: "auto",
                }}
              >
                Explore →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
