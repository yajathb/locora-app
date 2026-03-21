interface DetailSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string | React.ReactNode;
}

export default function DetailSection({ title, icon, content }: DetailSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-5 h-5" style={{ color: "var(--brand-sky)" }}>{icon}</div>
        <h3
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--brand-sky)",
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "var(--brand-slate)",
          lineHeight: 1.65,
        }}
        className="ml-8"
      >
        {content}
      </div>
    </div>
  );
}
