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
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search
          style={{ color: "var(--brand-slate)" }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            borderColor: "rgba(168,196,222,0.4)",
            color: "#ffffff",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "13px",
            fontWeight: 300,
          }}
          className="w-full pl-9 pr-9 py-3 rounded border focus:outline-none focus:border-sky-400 transition placeholder:text-slate-400"
        />
        {query && (
          <button
            onClick={handleClear}
            style={{ color: "var(--brand-slate)" }}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
