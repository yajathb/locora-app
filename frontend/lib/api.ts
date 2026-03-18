import { Event, Place, FilterOptions } from "@/types/index";
import eventsData from "@/data/events.json";
import placesData from "@/data/places.json";

// Data abstraction layer - easy to swap JSON for Flask API later
// Usage: Replace fetch calls with axios calls to http://localhost:5000/api/...

export async function getEvents(filters?: FilterOptions): Promise<Event[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...eventsData] as Event[];

      if (filters?.search) {
        const search = filters.search.toLowerCase();
        results = results.filter(
          (e) =>
            e.title.toLowerCase().includes(search) ||
            e.description.toLowerCase().includes(search) ||
            e.organizer.toLowerCase().includes(search),
        );
      }

      if (filters?.category) {
        results = results.filter((e) => e.category === filters.category);
      }

      if (filters?.dateFrom) {
        results = results.filter((e) => e.date >= filters.dateFrom!);
      }

      if (filters?.dateTo) {
        results = results.filter((e) => e.date <= filters.dateTo!);
      }

      resolve(
        results.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      );
    }, 0);
  });
}

export async function getEventById(id: string): Promise<Event | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = (eventsData as Event[]).find((e) => e.id === id) || null;
      resolve(event);
    }, 0);
  });
}

export async function getPlaces(filters?: FilterOptions): Promise<Place[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...placesData] as Place[];

      if (filters?.search) {
        const search = filters.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.address.toLowerCase().includes(search),
        );
      }

      if (filters?.category) {
        results = results.filter((p) => p.category === filters.category);
      }

      resolve(results.sort((a, b) => a.name.localeCompare(b.name)));
    }, 0);
  });
}

export async function getPlaceById(id: string): Promise<Place | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const place = (placesData as Place[]).find((p) => p.id === id) || null;
      resolve(place);
    }, 0);
  });
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
