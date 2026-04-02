"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import type { Category } from "@/types";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onDateRangeChange?: (from: string, to: string) => void;
}

const categories: Category[] = [
  "Music", "Sports", "Arts", "Community",
  "Food", "Education", "Family", "Outdoor",
];

export default function FilterSidebar({
  categories: categoriesFilter,
  selectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: "var(--brand-paper)",
            borderColor: "var(--brand-rule)",
            color: "var(--brand-ink)",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
          className="w-full flex items-center justify-between px-4 py-3 border rounded transition"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        style={{
          backgroundColor: "var(--brand-paper)",
          borderColor: "var(--brand-rule)",
        }}
        className={`${isOpen ? "block" : "hidden"} md:block rounded border p-6`}
      >
        <h2
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--brand-sky)",
            marginBottom: "16px",
          }}
        >
          Filter by Category
        </h2>

        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange(null)}
            style={{
              backgroundColor: selectedCategory === null ? "var(--brand-fog)" : "transparent",
              color: selectedCategory === null ? "var(--brand-ink)" : "var(--brand-slate)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              fontWeight: selectedCategory === null ? 500 : 400,
              borderLeft: selectedCategory === null ? "2px solid var(--brand-sky)" : "2px solid transparent",
              paddingLeft: "10px",
            }}
            className="w-full text-left py-2 rounded-r transition"
          >
            All Categories
          </button>

          {categories
            .filter((cat) => categoriesFilter.includes(cat))
            .map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                style={{
                  backgroundColor: selectedCategory === category ? "var(--brand-fog)" : "transparent",
                  color: selectedCategory === category ? "var(--brand-ink)" : "var(--brand-slate)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  fontWeight: selectedCategory === category ? 500 : 400,
                  borderLeft: selectedCategory === category ? "2px solid var(--brand-sky)" : "2px solid transparent",
                  paddingLeft: "10px",
                }}
                className="w-full text-left py-2 rounded-r transition"
              >
                {category}
              </button>
            ))}
        </div>

        <button
          onClick={() => setIsOpen(false)}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--brand-slate)",
          }}
          className="md:hidden w-full py-2 mt-4 hover:opacity-80 transition"
        >
          Close
        </button>
      </div>
    </>
  );
}
