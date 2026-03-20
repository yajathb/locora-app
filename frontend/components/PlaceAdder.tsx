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

    const payload: Record<string, unknown> = {
      id,
      name: placeName,
      location: placeLocation,
    };

    if (placeDescription) payload.description = placeDescription;
    if (placeCategory) payload.category = placeCategory;
    if (placeWeblink) payload.weblink = placeWeblink;
    if (placeImage) payload.image = imageBase64;
    if (placeAddress) payload.address = placeAddress;

    try {
      const { error } = await supabase.from("places").insert(payload);

      if (error) throw error;

      alert("Place added successfully!");
      setPlaceName("");
      setPlaceDescription("");
      setPlaceLocation("");
      setPlaceCategory("");
      setPlaceWeblink("");
      setPlaceImage(null);
      setPlaceAddress("");
    } catch (error) {
      console.error("Error adding place:", error);
      alert("An error occurred while adding the place. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Place</h2>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Place Name*</label>
        <input
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          required
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Location*</label>
        <input
          type="text"
          value={placeLocation}
          onChange={(e) => setPlaceLocation(e.target.value)}
          required
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Description</label>
        <textarea
          value={placeDescription}
          onChange={(e) => setPlaceDescription(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Address</label>
        <input
          type="text"
          value={placeAddress}
          onChange={(e) => setPlaceAddress(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Category</label>
        <input
          type="text"
          value={placeCategory}
          onChange={(e) => setPlaceCategory(e.target.value)}
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Weblink</label>
        <input
          type="url"
          value={placeWeblink}
          onChange={(e) => setPlaceWeblink(e.target.value)}
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
            setPlaceImage(e.target.files ? e.target.files[0] : null)
          }
          className="input-field"
          style={{ borderColor: "var(--border-color)" }}
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Add Place
      </button>
    </form>
  );
}