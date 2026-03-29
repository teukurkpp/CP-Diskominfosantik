import React, { useEffect } from "react";
import YouTubeLogo from "../assets/youtube-svgrepo-com.svg";

import Thumbnail from "../assets/Thumbnail.png";

export default function VideoModal({
  isOpen,
  onClose,
  title,
  videoUrl,
  description,
  thumbnailUrl,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isInstagramVideo = (url) => {
    return (
      url.includes("instagram.com/p/") || url.includes("instagram.com/reel/")
    );
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const isInsta = isInstagramVideo(videoUrl);

  let embedUrl = "";
  let watchButton = null;

  if (videoId) {
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
    watchButton = (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
      >
        <img src={YouTubeLogo} alt="YouTube Logo" className="w-5 h-5 mr-2" />
        Tonton di YouTube
      </a>
    );
  } else if (isInsta) {
    const match = videoUrl.match(
      /(?:instagram.com\/p\/|instagram.com\/reel\/)([a-zA-Z0-9_-]+)/
    );
    const shortcode = match ? match[1] : null;
    if (shortcode) {
      embedUrl = `https://www.instagram.com/p/${shortcode}/embed/`;
    }
    watchButton = (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
      >
        Lihat di Instagram
      </a>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content - Centered and larger */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Video Player */}
          {embedUrl ? (
            <div className="relative pb-[56.25%] h-0 mb-4">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                allowTransparency="true"
                title={title}
              ></iframe>
            </div>
          ) : (
            <div className="relative pb-[56.25%] h-0 mb-4 bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt="Video Thumbnail"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={Thumbnail}
                  alt="Default Thumbnail"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              )}
              <p className="absolute text-white text-lg font-semibold bg-black bg-opacity-50 p-4 rounded-md">
                Video tidak dapat diputar atau tidak didukung.
              </p>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base mb-4">
              {description}
            </p>
          )}

          {/* Watch on Platform Button */}
          {videoUrl && watchButton && (
            <div className="mt-4 flex justify-center">{watchButton}</div>
          )}

          {/* Close Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition focus:outline-none cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
