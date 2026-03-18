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
        <div className="w-6 h-6 text-blue-600 dark:text-blue-400">{icon}</div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
      </div>
      <div className="ml-9 text-gray-700 dark:text-gray-300">{content}</div>
    </div>
  );
}
