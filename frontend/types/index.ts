export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO 8601 format
  time: string; // HH:MM format
  endTime?: string;
  location: string;
  address: string;
  category: string;
  image: string;
  organizer: string;
  weblink?: string;
  featured?: boolean;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone?: string;
  hours?: string;
  image: string;
  website?: string;
  featured?: boolean;
}

export type Category =
  | "Music"
  | "Sports"
  | "Arts"
  | "Community"
  | "Food"
  | "Education"
  | "Family"
  | "Outdoor";

export interface FilterOptions {
  category?: Category;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
