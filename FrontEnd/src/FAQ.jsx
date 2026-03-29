import React, { useState, useEffect } from "react";

const faqItems = [
  {
    question: "Bagaimana cara mengakses layanan publik secara online?",
    answer:
      "Untuk mengakses layanan publik secara online, Anda dapat mengunjungi website resmi kami atau mengunduh aplikasi mobile Diskominfo.",
  },
  {
    question: "Bagaimana cara mengakses layanan publik secara online?",
    answer:
      "Untuk mengakses layanan publik secara online, Anda dapat mengunjungi website resmi kami atau mengunduh aplikasi mobile Diskominfo.",
  },
  {
    question: "Apa saja persyaratan untuk pengajuan surat elektronik?",
    answer:
      "Persyaratan pengajuan surat elektronik meliputi: KTP elektronik yang masih berlaku, email aktif, dan nomor telepon yang dapat dihubungi.",
  },
  {
    question: "Berapa lama proses penanganan pengaduan masyarakat?",
    answer:
      "Proses penanganan pengaduan masyarakat membutuhkan waktu 3-5 hari kerja.",
  },
  {
    question: "Dimana saya bisa mendapatkan informasi tentang tender?",
    answer:
      "Informasi tender dapat diakses melalui menu 'Pengadaan' di website resmi kami.",
  },
  {
    question: "Bagaimana cara menggunakan aplikasi mobile Diskominfo?",
    answer:
      "Unduh aplikasi dari Play Store/App Store, lakukan registrasi dengan email aktif.",
  },
];

function PlusIcon({ isOpen }) {
  return (
    <div className="w-8 h-8 rounded-full border-2 border-blue-900 flex items-center justify-center mr-4 flex-shrink-0 transition-transform">
      <svg
        className={`w-4 h-4 text-blue-900 transition-transform ${
          isOpen ? "rotate-45" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-[650px] pt-1">
      {" "}
      {/* Fixed height class */}
      {/* Content */}
      <div className="relative z-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-left mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 font-serif mb-4">
            FAQ's
          </h1>
          <div className="h-1.5 w-24 bg-blue-900"></div>
        </div>

        {/* FAQ List - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <ul className="space-y-6">
            {faqItems
              .slice(0, Math.ceil(faqItems.length / 2))
              .map((item, index) => (
                <li
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start p-6 focus:outline-none cursor-pointer"
                  >
                    <PlusIcon isOpen={openIndex === index} />
                    <div className="text-left">
                      <span className="text-lg text-gray-800">
                        {item.question}
                      </span>
                      {openIndex === index && (
                        <p className="mt-4 text-gray-600 pl-2 border-l-2 border-blue-900">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
          </ul>

          {/* Kolom Kanan */}
          <ul className="space-y-6">
            {faqItems
              .slice(Math.ceil(faqItems.length / 2))
              .map((item, index) => (
                <li
                  key={index + Math.ceil(faqItems.length / 2)}
                  className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <button
                    onClick={() =>
                      toggleFAQ(index + Math.ceil(faqItems.length / 2))
                    }
                    className="w-full flex items-start p-6 focus:outline-none cursor-pointer"
                  >
                    <PlusIcon
                      isOpen={
                        openIndex === index + Math.ceil(faqItems.length / 2)
                      }
                    />
                    <div className="text-left">
                      <span className="text-lg text-gray-800">
                        {item.question}
                      </span>
                      {openIndex === index + Math.ceil(faqItems.length / 2) && (
                        <p className="mt-4 text-gray-600 pl-2 border-l-2 border-blue-900">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
