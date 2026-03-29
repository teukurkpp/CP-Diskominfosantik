import React, { useEffect } from "react";
import Header from "./components/Header";
import struktur from "./assets/strukturr.png";
import bekasi from "./assets/Bekasikab.png";

export default function TentangStruktur() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="STRUKTUR ORGANISASI" />

      <div className="relative container mx-auto py-12 px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bekasi})`,
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: "0.1",
            transform: "scale(0.9)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-full max-w-6xl p-4">
            <img
              src={struktur}
              alt="Struktur Organisasi"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
