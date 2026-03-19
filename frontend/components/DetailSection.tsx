interface DetailSectionProps {
  title: string;
  icon: React.ReactNode;
  content: string | React.ReactNode;
}

export default function DetailSection({
  title,
  icon,
  content,
}: DetailSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 h-6 text-blue-600">{icon}</div>
        <h3 style={{ color: "var(--text-primary)" }} className="font-semibold">
          {title}
        </h3>
      </div>
      <div style={{ color: "var(--text-secondary)" }} className="ml-9">
        {content}
      </div>
    </div>
  );
}
