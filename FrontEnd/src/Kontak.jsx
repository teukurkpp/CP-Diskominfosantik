import React, { useEffect } from "react";

function MapPinIcon() {
  return (
    <svg
      className="w-8 h-8 text-blue-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      className="w-8 h-8 text-blue-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="w-8 h-8 text-blue-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export default function Kontak() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen relative min-h-[800px]">
      {/* Header Section */}
      <div className="relative w-full py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            KONTAK
          </h1>
        </div>
      </div>

      {/* Contact Content Section */}
      <div className="container mx-auto px-4 -mt-2">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Map */}
          <div className="w-full mb-8">
            <div className="w-full h-[400px] rounded-lg shadow overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Komplek+Pemda+Kab.+Bekasi+Blok+E2,+Sukamahi,+Kec.+Cikarang+Pusat,+Kabupaten+Bekasi,+Jawa+Barat+17530&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <MapPinIcon />
              <div>
                <h2 className="font-bold text-gray-900 mb-2">Lokasi</h2>
                <p className="text-gray-600">
                  Komplek Perkantoran Pemerintah Kabupaten Bekasi Kel. Sukamahi,
                  Kec. Cikarang Pusat, Kabupaten Bekasi, Jawa Barat, 17811
                  Indonesia
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <EnvelopeIcon />
              <div>
                <h2 className="font-bold text-gray-900 mb-2">Email</h2>
                <a
                  href="mailto:diskominfo@gmail.com"
                  className="text-blue-700 underline text-gray-600"
                >
                  diskominfo@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PhoneIcon />
              <div>
                <h2 className="font-bold text-gray-900 mb-2">No. Telp</h2>
                <p className="text-gray-600">08xxxxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
