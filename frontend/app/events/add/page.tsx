"use client";
import { useState } from "react";
import EventAdder from "@/components/EventAdder";

export default function AddEventPage() {
  return (
    <div className="min-h-screen p-4 flex flex-col items-center" style={{backgroundColor: "var(--bg-primary)"}}>
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">
        Add New Event
      </h1>
      <div className="card p-6 w-full max-w-3xl animate-scale-in">
        <EventAdder />
      </div>
    </div>
  );
}
