import React from "react";

const NewsCard = ({ title, description, source, date, imageUrl, url }) => {
  const fallbackImageUrl = "https://via.placeholder.com/150"; // Replace with a better fallback image URL if needed

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
    >
      <img
        className="w-full h-48 object-cover"
        src={imageUrl || fallbackImageUrl}
        alt={title}
        onError={(e) => {
          e.target.onerror = null; // Prevents looping
          e.target.src = fallbackImageUrl;
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {source}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {new Date(date).toDateString()}
        </span>
      </div>
    </a>
  );
};

export default NewsCard;
