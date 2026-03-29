import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

const API_URL = "http://localhost:5000/api/berita";

const getImageUrl = (path) => {
  if (!path) return null;
  let cleanPath = path;
  if (path.startsWith("uploads/")) {
    cleanPath = path.substring("uploads/".length);
  }
  if (!cleanPath.includes("/") && !cleanPath.startsWith("artikel/")) {
    cleanPath = `artikel/${cleanPath}`;
  }
  return `http://localhost:5000/uploads/${cleanPath}`;
};

const formatTanggalIndonesia = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

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

function ArticleCard({ id, judul, uploaded_at, gambar_path, onClick }) {
  const imageUrl = getImageUrl(gambar_path);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={judul}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
              console.error("Image failed to load:", imageUrl);
            }}
          />
        ) : (
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-500">GAMBAR BERITA</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* TANGGAL SUDAH PAKAI FORMAT BARU */}
        <span className="text-sm text-gray-500">
          {formatTanggalIndonesia(uploaded_at)}
        </span>
        <h3 className="font-bold text-gray-800 mt-2 uppercase">{judul}</h3>
        <div className="mt-4 text-right">
          <button
            className="text-sm text-gray-500 inline-flex items-center hover:text-blue-600 focus:outline-none cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Baca Selengkapnya
            <svg
              className="w-4 h-4 ml-1"
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
      </div>
    </div>
  );
}

function ArticleDetail({ article, onBack }) {
  const imageUrl = getImageUrl(article.gambar_path);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-0 px-0">
      <div className="w-full bg-white overflow-visible pt-10">
        {/* Image Container */}
        <div className="container mx-auto px-4">
          <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center rounded-2xl overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={article.judul}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-lg">GAMBAR BERITA</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {article.judul}
            </h1>
            {/* TANGGAL DI DETAIL JUGA SUDAH PAKAI FORMAT BARU */}
            <p className="text-gray-500 mb-8 text-sm">
              {formatTanggalIndonesia(article.uploaded_at)}
            </p>
            {/* Article content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {article.isi
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim() !== "")
                .map((paragraph, index) => (
                  <p key={index} className="text-justify mb-6">
                    {paragraph.trim()}
                  </p>
                ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={onBack}
                className="px-8 py-3 rounded-full bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition text-lg cursor-pointer"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeritaArtikel() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setArticles(response.data);
      } catch (err) {
        setError("Failed to fetch articles.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaginatedArticles = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  };

  useEffect(() => {
    if (selectedArticle) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedArticle]);

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">{error}</p>
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
            ARTIKEL
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
              className="w-full pl-10 pr-4 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No articles found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPaginatedArticles().map((article) => (
              <ArticleCard
                key={article.id}
                judul={article.judul}
                uploaded_at={article.uploaded_at}
                gambar_path={article.gambar_path}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {getTotalPages() > 1 && (
        <div className="flex justify-center items-center gap-2 pb-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full cursor-pointer ${
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
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()))
            }
            disabled={currentPage === getTotalPages()}
            className={`p-2 rounded-full cursor-pointer ${
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
    </div>
  );
}
