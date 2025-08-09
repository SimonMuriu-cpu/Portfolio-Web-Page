import React from "react";
import { formatDistanceToNow } from "date-fns";

const CardContent = ({ title, content, createdAt }) => {
  const truncatedContent =
    content.length > 150 ? content.substring(0, 150) + "..." : content;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-blue-800 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
        {truncatedContent}
      </p>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </span>
    </div>
  );
};

export default CardContent;