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
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "var(--brand-mist)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "20px",
          fontWeight: 300,
          width: "36px",
          height: "36px",
          borderRadius: "4px",
          border: "0.5px solid rgba(168,196,222,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="hover:bg-white/20 transition"
      >
        +
      </button>

      {open && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderColor: "var(--brand-rule)",
            boxShadow: "0 8px 24px rgba(13,35,64,0.12)",
            minWidth: "160px",
          }}
          className="absolute top-[110%] left-0 rounded border z-50 overflow-hidden"
        >
          <a
            href="/events/add"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "var(--brand-ink)",
              display: "block",
              padding: "10px 16px",
              borderBottom: "0.5px solid var(--brand-rule)",
            }}
            className="hover:bg-fog transition-colors duration-150"
          >
            Add an Event
          </a>
          <a
            href="/places/add"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "var(--brand-ink)",
              display: "block",
              padding: "10px 16px",
            }}
            className="hover:bg-fog transition-colors duration-150"
          >
            Add a Place
          </a>
        </div>
      )}
    </div>
  );
}

export default PlusDropdown;
