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
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-50">
              Filters
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6`}
      >
        <h2 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">
            Category
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === null
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
          className="md:hidden w-full py-2 text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-900 dark:hover:text-gray-200 transition"
        >
          Close Filters
        </button>
      </div>
    </>
  );
}
