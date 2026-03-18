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
      <div className="group cursor-pointer">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-blue-900/30 transition-shadow overflow-hidden h-full flex flex-col border-0 dark:border-0 hover:border-blue-200 dark:hover:border-blue-800">
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 h-40">
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
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1 mb-1">
              {place.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {place.description}
            </p>

            {/* Info */}
            <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300 mb-3">
              {place.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{place.address}</span>
                </div>
              )}
              {place.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>{place.phone}</span>
                </div>
              )}
              {place.hours && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 dark:text-gray-500">
                    Hours:
                  </span>
                  <span>{place.hours}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              {place.website && (
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              )}
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 translate-x-0 group-hover:translate-x-1 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
