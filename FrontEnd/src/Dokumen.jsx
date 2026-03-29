import React, { useEffect, useState } from "react";

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

function DownloadIcon() {
  return (
    <svg
      className="w-6 h-6 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

function ChevronDownIcon() {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function Dokumen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState(0);

  const categories = ["Regulasi", "Laporan", "Data & Statistik"];
  const ITEMS_PER_PAGE = 5;
  const PAGES_PER_GROUP = 3;

  const fetchDocuments = async () => {
    const kategori =
      selectedCategory === "ALL" ? "" : encodeURIComponent(selectedCategory);
    console.log("Sending category:", kategori);
    const url = `http://localhost:5000/api/dokumen?pencarian=${encodeURIComponent(
      searchTerm
    )}&kategori=${kategori}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
    console.log("Fetching URL:", url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Received data:", data);
      setDocuments(data.documents || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, selectedCategory, searchTerm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDownload = (id) => {
    window.location.href = `http://localhost:5000/api/dokumen/${id}/download`;
  };

  const getFileType = (filePath) => {
    return filePath.split(".").pop().toUpperCase();
  };

  const getTotalPages = () => Math.ceil(total / ITEMS_PER_PAGE);
  const getTotalGroups = () => Math.ceil(getTotalPages() / PAGES_PER_GROUP);

  const getCurrentGroupPages = () => {
    const startPage = (pageGroup - 1) * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, getTotalPages());
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const nextGroup = () => {
    if (pageGroup < getTotalGroups()) {
      setPageGroup((prev) => prev + 1);
      setCurrentPage(pageGroup * PAGES_PER_GROUP + 1);
    }
  };

  const prevGroup = () => {
    if (pageGroup > 1) {
      setPageGroup((prev) => prev - 1);
      setCurrentPage((pageGroup - 2) * PAGES_PER_GROUP + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setPageGroup(1);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
          DOKUMEN
        </h1>

        {/* Search & Filter Controls */}
        <div className="flex gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Telusuri"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              {selectedCategory}
              <ChevronDownIcon />
            </button>

            {/* Dropdown menu */}
            {showCategories && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setShowCategories(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                    selectedCategory === "ALL" ? "bg-blue-50 text-blue-600" : ""
                  }`}
                >
                  ALL
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategories(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-4 mb-12">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded 
                  ${
                    getFileType(doc.file_path) === "PDF"
                      ? "bg-blue-100 text-blue-600"
                      : getFileType(doc.file_path) === "DOC" ||
                        getFileType(doc.file_path) === "DOCX"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {getFileType(doc.file_path)}
                </span>
                <h3 className="font-medium text-gray-700">{doc.judul}</h3>
                <span className="text-sm text-gray-500">({doc.kategori})</span>
              </div>
              <button
                onClick={() => handleDownload(doc.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <DownloadIcon />
              </button>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              Tidak ada dokumen ditemukan
            </div>
          )}
        </div>

        {/* Updated Pagination with Groups */}
        {getTotalPages() > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={prevGroup}
              disabled={pageGroup === 1}
              className={`p-2 rounded-full ${
                pageGroup === 1
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
              {getCurrentGroupPages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
                    ${
                      currentPage === page
                        ? "bg-blue-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}
              {pageGroup < getTotalGroups() && (
                <span className="text-gray-400">...</span>
              )}
            </div>

            <button
              onClick={nextGroup}
              disabled={pageGroup === getTotalGroups()}
              className={`p-2 rounded-full ${
                pageGroup === getTotalGroups()
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
    </div>
  );
}
