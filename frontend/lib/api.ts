import { Event, Place, FilterOptions } from "@/types/index";
import placesData from "@/data/places.json";
import axios from "axios";

// Data abstraction layer - easy to swap JSON for Flask API later
// Usage: Replace fetch calls with axios calls to http://localhost:5000/api/...

export async function getEvents(filters?: FilterOptions): Promise<Event[]> {
  try {
    // Construct query parameters based on filters
    const params: { [key: string]: string | undefined } = {
      search: filters?.search,
      category: filters?.category,
      dateFrom: filters?.dateFrom,
      dateTo: filters?.dateTo,
    };

    // Make the API call with query parameters
    const response = await axios.get("http://localhost:5000/api/events", {
      params,
    });

    // Return the events from the API response
    return response.data as Event[];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const response = await axios.get(`http://localhost:5000/api/events/${id}`);
    return response.data as Event | null;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
}

export async function getPlaces(filters?: FilterOptions): Promise<Place[]> {
  try {
    const params: { [key: string]: string | undefined } = {
      search: filters?.search,
      category: filters?.category,
    };

    const response = await axios.get("http://localhost:5000/api/places", {
      params,
    });

    return response.data as Place[];
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function getPlaceById(id: string): Promise<Place | null> {
  try {
    const response = await axios.get(`http://localhost:5000/api/places/${id}`);
    return response.data as Place | null;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents();
  return events.filter((e) => e.featured).slice(0, 6);
}

export async function getFeaturedPlaces(): Promise<Place[]> {
  const places = await getPlaces();
  return places.filter((p) => p.featured).slice(0, 6);
}

export function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    Music: "bg-purple-100 text-purple-800",
    Sports: "bg-red-100 text-red-800",
    Arts: "bg-pink-100 text-pink-800",
    Community: "bg-blue-100 text-blue-800",
    Food: "bg-orange-100 text-orange-800",
    Education: "bg-green-100 text-green-800",
    Family: "bg-yellow-100 text-yellow-800",
    Outdoor: "bg-teal-100 text-teal-800",
    Entertainment: "bg-indigo-100 text-indigo-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
