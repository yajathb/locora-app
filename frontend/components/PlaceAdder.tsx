"use client";
import { useState } from "react";
import axios from "axios";

export default function PlaceAdder() {
  const [placeName, setPlaceName] = useState("");
  const [placeDate, setPlaceDate] = useState("");
  const [placeTime, setPlaceTime] = useState("");
  const [placeEndTime, setPlaceEndTime] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeCategory, setPlaceCategory] = useState("");
  const [placeOrganizer, setPlaceOrganizer] = useState("");
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

    if (!placeName || !placeDate) {
      alert("Please fill in the required fields: Place Name, and Date.");
      return;
    }
    const imageBase64 = placeImage ? await toBase64(placeImage) : null;
    const payload: Record<string, unknown> = {
      name: placeName,
      date: placeDate,
      time: placeTime,
    };

    if (placeEndTime) payload.endTime = placeEndTime;
    if (placeDescription) payload.description = placeDescription;
    if (placeLocation) payload.location = placeLocation;
    if (placeCategory) payload.category = placeCategory;
    if (placeOrganizer) payload.organizer = placeOrganizer;
    if (placeWeblink) payload.weblink = placeWeblink;
    if (placeImage) payload.image = imageBase64;
    if (placeAddress) payload.address = placeAddress;
    console.log(payload);

    try {
      const response = await axios.post("http://localhost:5000/api/places/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Place added successfully!");
        setPlaceName("");
        setPlaceDate("");
        setPlaceTime("");
        setPlaceEndTime("");
        setPlaceDescription("");
        setPlaceLocation("");
        setPlaceCategory("");
        setPlaceOrganizer("");
        setPlaceWeblink("");
        setPlaceImage(null);
        setPlaceAddress("");
      } else {
        alert("Failed to add place. Please try again.");
      }
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
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Date*</label>
        <input
          type="date"
          value={placeDate}
          onChange={(e) => setPlaceDate(e.target.value)}
          required
          className="input-field"
            style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Description</label>
        <textarea
          value={placeDescription}
          onChange={(e) => setPlaceDescription(e.target.value)}
          className="input-field"
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Location</label>
        <input
          type="text"
          value={placeLocation}
          onChange={(e) => setPlaceLocation(e.target.value)}
          className="input-field"
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Address</label>
        <input
          type="text"
          value={placeAddress}
          onChange={(e) => setPlaceAddress(e.target.value)}
          className="input-field"
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Category</label>
        <input
          type="text"
          value={placeCategory}
          onChange={(e) => setPlaceCategory(e.target.value)}
          className="input-field"
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Weblink</label>
        <input
          type="url"
          value={placeWeblink}
          onChange={(e) => setPlaceWeblink(e.target.value)}
          className="input-field"
          style={{borderColor: "var(--border-color)"}}
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
          style={{borderColor: "var(--border-color)"}}
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Add Place
      </button>
    </form>
  );
}
