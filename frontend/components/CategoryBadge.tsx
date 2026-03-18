import { getCategoryColor } from "@/lib/api";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({
  category,
  size = "md",
}: CategoryBadgeProps) {
  const baseClass =
    size === "sm"
      ? "text-xs px-2 py-1 rounded-full font-medium"
      : "text-sm px-3 py-1 rounded-full font-semibold";

  return (
    <span className={`${getCategoryColor(category)} ${baseClass}`}>
      {category}
    </span>
  );
}
