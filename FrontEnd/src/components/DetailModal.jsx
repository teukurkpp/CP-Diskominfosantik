import React, { useEffect } from "react";

export default function DetailModal({ item, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
          {/* Image */}
          <div className="w-full h-96 bg-gray-100 rounded-lg mb-8 overflow-hidden">
            {item.image ? (
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Content - Centered text */}
          <div className="space-y-6 text-left max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.date}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
              {item.deskripsi}
            </p>
          </div>

          {/* Close Button - Aligned to right */}
          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition focus:outline-none cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
