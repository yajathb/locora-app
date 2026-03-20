import { useState, useEffect, useRef } from "react";

function PlusDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="text-xl font-light flex items-center justify-center transition-all duration-200 hover-scale shadow-sm"
        style={{backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)"}}
      >
        +
      </button>

      {open && (
        <div
          className="absolute top-[110%] left-0 min-w-[150px] rounded-lg shadow-md z-100 animate-scale-in card border"
          style={{ borderColor: "var(--border-color)" }}
        >
        <a
            href="/events/add"
            className="block px-4 py-2.5 text-sm nav-link rounded-t-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
          >
            Add an Event
          </a>
          <a
            href="/places/add"
            className="block px-4 py-2.5 text-sm nav-link rounded-b-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
          >
            Add a Place
          </a>
        </div>
      )}
    </div>
  );
}

export default PlusDropdown;