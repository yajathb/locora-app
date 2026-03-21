import { Event, Place, FilterOptions } from "@/types/index";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getEvents(filters?: FilterOptions): Promise<Event[]> {
  try {
    let query = supabase.from("events").select("*");

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }
    if (filters?.dateFrom) {
      query = query.gte("date", filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte("date", filters.dateTo);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Event[];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Event | null;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
}

export async function getPlaces(filters?: FilterOptions): Promise<Place[]> {
  try {
    let query = supabase.from("places").select("*");

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Place[];
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function getPlaceById(id: string): Promise<Place | null> {
  try {
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Place | null;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("featured", 1)
      .limit(6);
    if (error) throw error;
    return data as Event[];
  } catch (error) {
    console.error("Error fetching featured events:", error);
    throw error;
  }
}

export async function getFeaturedPlaces(): Promise<Place[]> {
  try {
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("featured", 1)
      .limit(6);
    if (error) throw error;
    return data as Place[];
  } catch (error) {
    console.error("Error fetching featured places:", error);
    throw error;
  }
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