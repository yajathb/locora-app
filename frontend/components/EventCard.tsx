"use client";

import Link from "next/link";
import { Event } from "@/types/index";
import { MapPin, Clock, ChevronRight, Calendar } from "lucide-react";
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
        className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-blue-900/30 transition-all duration-300 overflow-hidden h-full flex flex-col border-0 dark:border-0 hover:border-blue-200 dark:hover:border-blue-800">
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 h-48">
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
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-2">
              {event.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {event.description}
            </p>

            {/* Date & Time */}
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {event.organizer}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
