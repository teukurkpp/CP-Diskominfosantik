import React, { useEffect } from "react";

function MissionCard({ icon, title, description }) {
  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md aspect-square flex flex-col hover:shadow-lg transition-all">
      <div className="flex flex-col items-center text-center gap-8">
        {" "}
        {/* Increased gap */}
        <div className="bg-blue-100 p-5 rounded-xl flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
        </div>
        <div className="space-y-4">
          <h3 className="font-poppins text-xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 text-base font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TentangSejarah() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-2">
      {/* Hero Card Section */}
      <div className="container mx-auto px-4 pt-3 relative z-10">
        {/* Main Card */}
        <div className="max-w-8xl mx-auto rounded-2xl shadow-xl overflow-hidden">
          {/* Top Image Section */}
          <div className="relative h-[800px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/src/assets/GedungSejarah.png')",
              }}
            />
            <div className="absolute inset-0 bg-blue-0" />
            <div className="relative h-full flex items-start justify-center pt-16">
              <h1 className="text-white font-bold text-6xl tracking-widest">
                SEJARAH
              </h1>
            </div>
          </div>

          {/* Bottom Content Section */}
          <div className="bg-blue-900 relative">
            {/* Batik Pattern Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url('/src/assets/Batik.png')",
                backgroundSize: "cover",
              }}
            />
            {/* Content */}
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-white mb-10">Sejarah</h2>
              <p className="text-white/90 leading-relaxed text-justify mb-10 text-xl font-poppins">
                Dinas Komunikasi, Informatika, Persandian, dan Statistik yang
                menjadi garda terdepan dalam transformasi digital pemerintahan
                daerah. Dinas ini bertanggung jawab penuh atas pengelolaan
                informasi publik, pembangunan infrastruktur teknologi, dan
                penerapan sistem pemerintahan berbasis elektronik (SPBE) untuk
                meningkatkan efisiensi dan transparansi layanan. Selain
                mengelola data dan statistik penting melalui inisiatif "Satu
                Data", Diskominfosantik juga mengembangkan berbagai aplikasi
                digital, seperti BEBUNGE, guna mempermudah interaksi masyarakat
                dengan pemerintah. Secara keseluruhan, peran mereka sangat vital
                dalam memastikan komunikasi, data, dan layanan publik berbasis
                digital berjalan lancar demi kemajuan Kabupaten Bekasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="h-[550px] w-full bg-cover bg-center -mt-[500px] -z-10 relative"
        style={{ backgroundImage: "url('/src/assets/GedungSejarah.png')" }}
      />

      {/* Visi Misi Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-blue-900 text-center mb-12">
            Visi Misi
          </h2>

          {/* Visi Box */}
          <div className="bg-blue-200 rounded-2xl p-10 mb-16 max-w-7xl mx-auto">
            <p className="text-blue-900 text-center font-poppins text-2xl font-semibold leading-relaxed">
              Terwujudnya Keamanan dan Ketahanan Informasi yang didukung dengan
              Infrastruktur Teknologi Informasi dan Komunikasi yang Mandiri
            </p>
          </div>

          {/* Misi Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
            <MissionCard
              icon={
                // Kualitas Layanan: Icon bintang
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
                    d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.908-1.004L12 2.75l3.092 5.751L22 9.505l-5.007 4.617 1.179 6.873z"
                  />
                </svg>
              }
              title="Kualitas Layanan"
              description="Meningkatkan kualitas pelayanan publik yang profesional berbasis teknologi informasi"
            />
            <MissionCard
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" d="M8 12h8M12 8v8" />
                </svg>
              }
              title="Infrastruktur Digital"
              description="Meningkatkan kapasitas dan kualitas infrastruktur jaringan untuk layanan teknologi informasi dan komunikasi"
            />
            <MissionCard
              icon={
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
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              title="Sumber Daya Manusia"
              description="Meningkatkan kualitas sumber daya manusia (SDM) di bidang teknologi informasi dan komunikasi"
            />
            <MissionCard
              icon={
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
                    d="M12 3l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V7l8-4z"
                  />
                </svg>
              }
              title="Keamanan"
              description="Meningkatkan keamanan dan ketahanan informasi yang didukung infrastruktur TIK yang mandiri"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
