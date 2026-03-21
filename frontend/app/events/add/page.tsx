"use client";
import { useState } from "react";
import EventAdder from "@/components/EventAdder";

export default function AddEventPage() {
  return (
    <div style={{ backgroundColor: "var(--bg-paper)" }} className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brand-sky)", marginBottom: "8px" }}>
          Contribute to Locora
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "36px", fontWeight: 300, color: "var(--brand-ink)", marginBottom: "24px", lineHeight: 1.1 }}>
          Add New Event
        </h1>
        <div style={{ backgroundColor: "var(--brand-paper)", borderColor: "var(--brand-rule)" }} className="rounded border p-8">
          <EventAdder />
        </div>
      </div>
    </div>
  );
}
