import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

function BeritaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError("Failed to fetch article.");
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Loading article...</p>
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

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      {/* Main image - Full width */}
      <div className="container mx-auto px-4">
        <div className="w-full bg-gray-100 mb-6 rounded-2xl overflow-hidden">
          {article.gambar_path ? (
            <img
              src={getImageUrl(article.gambar_path)}
              alt={article.judul}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center">
              <span className="text-gray-500 text-lg">GAMBAR BERITA</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Article header - Full width container */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-gray-900 mb-4">
            {article.judul}
          </h1>
          <time className="text-gray-500 text-sm">
            {new Date(article.uploaded_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

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

        {/* Back button */}
        <div className="mb-8 text-right">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeritaDetail;
