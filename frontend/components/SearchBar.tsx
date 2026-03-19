"use client";

import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search events, places...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="relative w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="relative">
        <Search
          style={{ color: "var(--text-tertiary)" }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          className="w-full pl-10 pr-10 py-3 rounded-lg border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
        />
        {query && (
          <button
            onClick={handleClear}
            style={{ color: "var(--text-tertiary)" }}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-blue-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
