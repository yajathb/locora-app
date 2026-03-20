"use client";

import Link from "next/link";
import { Event } from "@/types/index";
import { MapPin, Clock, ChevronRight, Calendar, Clock10 } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { formatDate, formatTime } from "@/lib/api";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div
        className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 animate-fade-in-up hover-lift ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
          className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border-0"
        >
          {/* Image */}
          <div
            style={{ backgroundColor: "var(--bg-tertiary)" }}
            className="relative overflow-hidden h-48"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3">
              <CategoryBadge category={event.category} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <h3
              className="font-bold text-lg transition-colors duration-300 line-clamp-2 mb-2"
              style={{ color: "var(--text-primary)" }}
>
              {event.title}
            </h3>

            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-sm line-clamp-2 mb-3"
            >
              {event.description}
            </p>

            {/* Date & Time */}
            <div
              style={{ color: "var(--text-secondary)" }}
              className="space-y-2 text-sm mb-3"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-tertiary)",
              }}
              className="mt-auto pt-3 border-t flex items-center justify-between"
            >
              <span className="text-xs">{event.organizer}</span>
              <ChevronRight className="w-4 h-4 group-hover:text-blue-600 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
