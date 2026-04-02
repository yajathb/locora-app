"use client";

import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types";
import { MapPin, Clock, Calendar } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { formatDate, formatTime } from "@/lib/api";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className={`group cursor-pointer animate-fade-in-up hover-lift ${featured ? "md:col-span-2 md:row-span-2" : ""}`}>
        <div
          style={{
            backgroundColor: "var(--brand-sand)",
            borderColor: "var(--brand-rule)",
          }}
          className="rounded overflow-hidden h-full flex flex-col border hover:shadow-md transition-shadow duration-300"
        >
          {/* Image */}
          <div
            style={{ backgroundColor: "var(--brand-steel)"}}
            className="relative overflow-hidden h-48"
          >
            <Image
              src={event.image}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />
            {/* "Locora Pick" tag — bottom-left, per brandkit card anatomy */}
            {event.featured && (
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
              <CategoryBadge category={event.category} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Overline — category + location style */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--brand-sky)",
                marginBottom: "6px",
              }}
            >
              {event.category}
            </p>

            {/* Card name — Cormorant Garamond, not bold */}
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "20px",
                fontWeight: 400,
                color: "var(--brand-ink)",
                lineHeight: 1.2,
                marginBottom: "6px",
              }}
              className="line-clamp-2"
            >
              {event.name}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                color: "var(--brand-slate)",
                lineHeight: 1.65,
                marginBottom: "12px",
              }}
              className="line-clamp-2"
            >
              {event.description}
            </p>

            {/* Meta */}
            <div
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", color: "var(--brand-slate)" }}
              className="space-y-1.5 mb-3"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand-sky)" }} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand-sky)" }} />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--brand-sky)" }} />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{ borderColor: "var(--brand-rule)", color: "var(--brand-slate)" }}
              className="mt-auto pt-3 border-t flex items-center justify-between"
            >
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9.5px" }}>{event.organizer}</span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8.5px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--brand-sky)",
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
