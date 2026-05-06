import React from "react";
import type { PostCardProps } from "./types";

export const PostCard: React.FC<PostCardProps> = ({
  imageUrl,
  badge,
  title,
  likesCount,
  timeAgo,
  owner,
  onDetailClick,
  onLikeClick,
}) => {
  return (
    <div className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow w-full max-w-[320px]">
      {/* Image / Placeholder Area */}
      <div className="h-48 bg-indigo-100 w-full relative">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col gap-3">
        {/* Badge */}
        <div className="self-start px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md">
          {badge}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 leading-tight">
          {title}
        </h3>

        {/* Stats (Likes & Time) */}
        <div className="flex items-center text-[11px] text-gray-500 gap-2">
          <span>{likesCount} orang suka</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>

        {/* Owner */}
        <div className="text-[11px] text-indigo-600 font-medium">{owner}</div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={onDetailClick}
            className="flex-1 bg-[#1a163a] text-white py-2 rounded-lg text-xs font-semibold hover:bg-indigo-950 transition-colors"
          >
            Detail
          </button>

          <button
            onClick={onLikeClick}
            className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors flex items-center justify-center"
            aria-label="Like post"
          >
            {/* Ikon Heart (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
