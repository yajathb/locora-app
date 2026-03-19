"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Category } from "@/types/index";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onDateRangeChange?: (from: string, to: string) => void;
}

const categories: Category[] = [
  "Music",
  "Sports",
  "Arts",
  "Community",
  "Food",
  "Education",
  "Family",
  "Outdoor",
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
      <div className="md:hidden mb-4 animate-fade-in-up">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
        className={`${
          isOpen ? "block" : "hidden"
        } md:block rounded-lg border p-6 animate-fade-in-up`}
      >
        <h2
          style={{ color: "var(--text-primary)" }}
          className="font-bold text-lg mb-4 flex items-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Filters
        </h2>

        {/* Categories */}
        <div className="mb-6">
          <h3
            style={{ color: "var(--text-primary)" }}
            className="font-semibold mb-3"
          >
            Category
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              style={{
                backgroundColor:
                  selectedCategory === null
                    ? "rgba(37, 99, 235, 0.1)"
                    : "transparent",
                color:
                  selectedCategory === null
                    ? "rgb(37, 99, 235)"
                    : "var(--text-secondary)",
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === null ? "font-medium" : "hover:opacity-80"
              }`}
            >
              All Categories
            </button>
            {categories
              .filter((cat) => categoriesFilter.includes(cat))
              .map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    onCategoryChange(
                      selectedCategory === category ? null : category,
                    )
                  }
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? "rgba(37, 99, 235, 0.1)"
                        : "transparent",
                    color:
                      selectedCategory === category
                        ? "rgb(37, 99, 235)"
                        : "var(--text-secondary)",
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? "font-medium"
                      : "hover:opacity-80"
                  }`}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          style={{ color: "var(--text-secondary)" }}
          className="md:hidden w-full py-2 text-sm font-medium hover:text-blue-600 transition"
        >
          Close Filters
        </button>
      </div>
    </>
  );
}
