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

    try {
      const imageBase64 = eventImage ? await toBase64(eventImage) : null;
      const uniqueString = `${eventName}_${eventDate}_${eventTime}_${eventDescription}`;
      const id = CryptoJS.MD5(uniqueString).toString();
      const payload: Record<string, unknown> = { id, name: eventName, date: eventDate, time: eventTime };
      if (eventEndTime) payload.end_time = eventEndTime;
      if (eventDescription) payload.description = eventDescription;
      if (eventLocation) payload.location = eventLocation;
      if (eventCategory) payload.category = eventCategory;
      if (eventOrganizer) payload.organizer = eventOrganizer;
      if (eventWeblink) payload.weblink = eventWeblink;
      if (eventImage) payload.image = imageBase64;
      if (eventAddress) payload.address = eventAddress;

      const { error } = await supabase.from("events").insert(payload);
      if (error) {
        console.error("Error adding event:", error);
        alert("An error occurred while adding the event. Please try again.");
        return;
      }

      alert("Event added successfully!");
      setEventName(""); setEventDate(""); setEventTime(""); setEventEndTime("");
      setEventDescription(""); setEventLocation(""); setEventCategory("");
      setEventOrganizer(""); setEventWeblink(""); setEventImage(null); setEventAddress("");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event. Please try again.");
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: "9px",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "var(--brand-slate)",
    marginBottom: "6px",
    display: "block",
  };

  const inputStyle: React.CSSProperties = {
    borderColor: "var(--brand-rule)",
    backgroundColor: "var(--brand-paper)",
    color: "var(--brand-ink)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "13px",
    fontWeight: 300,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 300, color: "var(--brand-ink)", marginBottom: "4px", lineHeight: 1.1 }}>
        Add New Event
      </h2>
      <div style={{ height: "0.5px", backgroundColor: "var(--brand-rule)", marginBottom: "20px" }} />

      {[
        { label: "Event Name*", type: "text", value: eventName, setter: setEventName, required: true },
        { label: "Date*", type: "date", value: eventDate, setter: setEventDate, required: true },
        { label: "Time*", type: "time", value: eventTime, setter: setEventTime, required: true },
        { label: "End Time", type: "time", value: eventEndTime, setter: setEventEndTime, required: false },
        { label: "Location", type: "text", value: eventLocation, setter: setEventLocation, required: false },
        { label: "Address", type: "text", value: eventAddress, setter: setEventAddress, required: false },
        { label: "Organizer", type: "text", value: eventOrganizer, setter: setEventOrganizer, required: false },
        { label: "Weblink", type: "url", value: eventWeblink, setter: setEventWeblink, required: false },
      ].map(({ label, type, value, setter, required }) => (
        <div key={label} className="flex flex-col">
          <label style={labelStyle}>{label}</label>
          <input
            type={type}
            value={value}
            onChange={(e) => setter(e.target.value)}
            required={required}
            className="input-field"
            style={inputStyle}
          />
        </div>
      ))}

      <div className="flex flex-col">
        <label style={labelStyle}>Description</label>
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="input-field"
          style={{ ...inputStyle, minHeight: "80px" }}
        />
      </div>

      <div className="flex flex-col">
        <label style={labelStyle}>Category</label>
        <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} className="input-field" style={inputStyle}>
          <option value="">Select a category</option>
          {["Music","Sports","Arts","Community","Food","Education","Family","Outdoor","Entertainment","Other"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label style={labelStyle}>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEventImage(e.target.files ? e.target.files[0] : null)}
          className="input-field"
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "var(--brand-navy)",
          color: "#ffffff",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "14px 0",
          borderRadius: "4px",
          width: "100%",
          border: "none",
          cursor: "pointer",
        }}
        className="hover:opacity-90 transition mt-2"
      >
        Add Event
      </button>
    </form>
  );
}
