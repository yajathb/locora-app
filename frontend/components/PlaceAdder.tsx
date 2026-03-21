"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PlaceAdder() {
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeCategory, setPlaceCategory] = useState("");
  const [placeWeblink, setPlaceWeblink] = useState("");
  const [placeImage, setPlaceImage] = useState<File | null>(null);
  const [placeAddress, setPlaceAddress] = useState("");

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName || !placeLocation) {
      alert("Please fill in the required fields: Place Name and Location.");
      return;
    }
    const imageBase64 = placeImage ? await toBase64(placeImage) : null;
    const uniqueString = `${placeName}_${placeLocation}_${placeDescription}`;
    const id = CryptoJS.MD5(uniqueString).toString();
    const payload: Record<string, unknown> = { id, name: placeName, location: placeLocation };
    if (placeDescription) payload.description = placeDescription;
    if (placeCategory) payload.category = placeCategory;
    if (placeWeblink) payload.weblink = placeWeblink;
    if (placeImage) payload.image = imageBase64;
    if (placeAddress) payload.address = placeAddress;
    try {
      const { error } = await supabase.from("places").insert(payload);
      if (error) throw error;
      alert("Place added successfully!");
      setPlaceName(""); setPlaceDescription(""); setPlaceLocation("");
      setPlaceCategory(""); setPlaceWeblink(""); setPlaceImage(null); setPlaceAddress("");
    } catch (error) {
      console.error("Error adding place:", error);
      alert("An error occurred while adding the place. Please try again.");
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
    backgroundColor: "#ffffff",
    color: "var(--brand-ink)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: "13px",
    fontWeight: 300,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 300, color: "var(--brand-ink)", marginBottom: "4px", lineHeight: 1.1 }}>
        Add New Place
      </h2>
      <div style={{ height: "0.5px", backgroundColor: "var(--brand-rule)", marginBottom: "20px" }} />

      {[
        { label: "Place Name*", type: "text", value: placeName, setter: setPlaceName, required: true },
        { label: "Location*", type: "text", value: placeLocation, setter: setPlaceLocation, required: true },
        { label: "Address", type: "text", value: placeAddress, setter: setPlaceAddress, required: false },
        { label: "Weblink", type: "url", value: placeWeblink, setter: setPlaceWeblink, required: false },
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
          value={placeDescription}
          onChange={(e) => setPlaceDescription(e.target.value)}
          className="input-field"
          style={{ ...inputStyle, minHeight: "80px" }}
        />
      </div>

      <div className="flex flex-col">
        <label style={labelStyle}>Category</label>
        <select value={placeCategory} onChange={(e) => setPlaceCategory(e.target.value)} className="input-field" style={inputStyle}>
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
          onChange={(e) => setPlaceImage(e.target.files ? e.target.files[0] : null)}
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
        Add Place
      </button>
    </form>
  );
}
