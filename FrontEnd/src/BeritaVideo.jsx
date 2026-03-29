import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import VideoModal from "./components/VideoModal";
import DefaultThumbnail from "./assets/Thumbnail.png";

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
      <svg
        className="w-8 h-8 text-blue-600 translate-x-0.5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

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

function VideoCard({ video, onClick }) {
  const videoId = getYouTubeVideoId(video.url_video);
  const isInsta = isInstagramVideo(video.url_video);
  let thumbnailUrl = null;

  if (videoId) {
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } else {
    thumbnailUrl = DefaultThumbnail;
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={thumbnailUrl}
          alt={video.judul}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <PlayIcon />
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 uppercase leading-snug mb-2">
          {video.judul}
        </h3>
        <span className="text-sm text-gray-500 block mb-2">
          {new Date(video.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <p className="text-gray-700 text-sm line-clamp-3">{video.deskripsi}</p>
      </div>
    </div>
  );
}

export default function BeritaVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/berita_video"
      );
      setVideos(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    const videoId = getYouTubeVideoId(video.url_video);
    let thumbnailUrl = null;

    if (videoId) {
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else {
      thumbnailUrl = DefaultThumbnail;
    }

    setSelectedVideo({ ...video, thumbnailUrl });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const filteredVideos = videos.filter((video) =>
    video.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaginatedVideos = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] flex items-center bg-fixed mb-12">
        <img
          src="/src/assets/Header_Image.png"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-8">
          <h1 className="text-white font-black text-5xl md:text-6xl tracking-wide text-left drop-shadow-lg">
            VIDEO
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 relative z-10 mt-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Telusuri"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredVideos.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Tidak ada video ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPaginatedVideos().map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={handleVideoClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {getTotalPages() > 1 && (
        <div className="flex justify-center items-center gap-2 pb-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
                  ${
                    currentPage === page
                      ? "bg-blue-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === getTotalPages()}
            className={`p-2 rounded-full ${
              currentPage === getTotalPages()
                ? "text-gray-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {isModalOpen && selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedVideo.judul}
          videoUrl={selectedVideo.url_video}
          description={selectedVideo.deskripsi}
          thumbnailUrl={selectedVideo.thumbnailUrl}
        />
      )}
    </div>
  );
}
