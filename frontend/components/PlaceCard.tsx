"use client";

import Link from "next/link";
import { Place } from "@/types/index";
import { MapPin, Phone, ChevronRight, Globe } from "lucide-react";
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
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
          className="rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col border-0"
        >
          {/* Image */}
          <div
            style={{ backgroundColor: "var(--bg-tertiary)" }}
            className="relative overflow-hidden h-40"
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3">
              <CategoryBadge category={place.category} size="sm" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <h3
              style={{ color: "var(--text-primary)" }}
              className="font-bold text-base group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 mb-1"
            >
              {place.name}
            </h3>

            <p
              style={{ color: "var(--text-secondary)" }}
              className="text-sm line-clamp-2 mb-3"
            >
              {place.description}
            </p>

            {/* Info */}
            <div
              style={{ color: "var(--text-secondary)" }}
              className="space-y-1 text-xs mb-3"
            >
              {place.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
              )}
              {place.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>{place.phone}</span>
                </div>
              )}
              {place.hours && (
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--text-tertiary)" }}>Hours:</span>
                  <span>{place.hours}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{ borderColor: "var(--border-color)" }}
              className="mt-auto pt-2 border-t flex items-center justify-between"
            >
              {place.website && <Globe className="w-3.5 h-3.5 text-blue-600" />}
              <ChevronRight className="w-4 h-4 group-hover:text-blue-600 transition-all duration-200 translate-x-0 group-hover:translate-x-1 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
