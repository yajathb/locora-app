"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EventAdder() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventWeblink, setEventWeblink] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventAddress, setEventAddress] = useState("");

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventTime) {
      alert("Please fill in the required fields: Event Name, Date, and Time.");
      return;
    }

    const imageBase64 = eventImage ? await toBase64(eventImage) : null;

    const uniqueString = `${eventName}_${eventDate}_${eventTime}_${eventDescription}`;
    const id = CryptoJS.MD5(uniqueString).toString();

    const payload: Record<string, unknown> = {
      id,
      name: eventName,
      date: eventDate,
      time: eventTime,
    };

    if (eventEndTime) payload.end_time = eventEndTime;
    if (eventDescription) payload.description = eventDescription;
    if (eventLocation) payload.location = eventLocation;
    if (eventCategory) payload.category = eventCategory;
    if (eventOrganizer) payload.organizer = eventOrganizer;
    if (eventWeblink) payload.weblink = eventWeblink;
    if (eventImage) payload.image = imageBase64;
    if (eventAddress) payload.address = eventAddress;

    try {
      const { error } = await supabase.from("events").insert(payload);

      if (error) throw error;

      alert("Event added successfully!");
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventEndTime("");
      setEventDescription("");
      setEventLocation("");
      setEventCategory("");
      setEventOrganizer("");
      setEventWeblink("");
      setEventImage(null);
      setEventAddress("");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Event Name*</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Date*</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Time*</label>
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          required
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">End Time</label>
        <input
          type="time"
          value={eventEndTime}
          onChange={(e) => setEventEndTime(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Description</label>
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Location</label>
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Address</label>
        <input
          type="text"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Category</label>
        <input
          type="text"
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Organizer</label>
        <input
          type="text"
          value={eventOrganizer}
          onChange={(e) => setEventOrganizer(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Weblink</label>
        <input
          type="url"
          value={eventWeblink}
          onChange={(e) => setEventWeblink(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setEventImage(e.target.files ? e.target.files[0] : null)
          }
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Add Event
      </button>
    </form>
  );
}