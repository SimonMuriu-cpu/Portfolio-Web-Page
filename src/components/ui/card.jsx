import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Original card used for blog post previews
export function Card({ post }) {
  if (!post) return null; // ✅ Prevent error when post is undefined

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(" ").length : 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <Link to={`/blog/${post.id}`}>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col group">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-3">
            {post.content?.substring(0, 150)}...
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-600/30 text-gray-300 text-xs rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {getReadingTime(post.content)} min read
          </div>
        </div>
      </div>
    </Link>
  );
}

// Reusable CardContent component for flexible usage (e.g. Admin Dashboard)
export function CardContent({ children }) {
  return <div className="flex-1">{children}</div>;
}
