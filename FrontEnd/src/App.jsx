import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import TentangSejarah from "./TentangSejarah";
import TentangProgram from "./TentangProgram";
import TentangStruktur from "./TentangStruktur";
import TentangPegawai from "./TentangPegawai";
import BeritaArtikel from "./BeritaArtikel";
import BeritaVideo from "./BeritaVideo";
import Dokumen from "./Dokumen";
import Layanan from "./Layanan";
import Kontak from "./Kontak";
import FAQ from "./FAQ";
import BeritaDetail from "./BeritaDetail";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

const heroImg = "src/assets/gedung.jpg";
const droneImg = "src/assets/video.png";

function Chevron({ up, active }) {
  return (
    <svg
      className={`w-4 h-4 ml-1 inline ${
        active ? "text-blue-600" : "text-gray-500"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {up ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 15l-6-6-6 6"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 9l6 6 6-6"
        />
      )}
    </svg>
  );
}

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > scrollThreshold
      ) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`bg-gray-300 shadow fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/logodiskominfosantik.png"
            alt="Logo Diskominfo"
            className="h-10 w-10"
          />
          <span className="font-bold text-lg text-blue-700">
            Diskominfosantik
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {[
            "Beranda",
            "Tentang",
            "Berita",
            "Dokumen",
            "Layanan",
            "Kontak",
            "FAQ",
          ].map((item) => {
            const isDropdown = item === "Tentang" || item === "Berita";
            const isOpen = openDropdown === item.toLowerCase();

            return isDropdown ? (
              <li
                key={item}
                className="relative"
                ref={isOpen ? dropdownRef : null}
              >
                <button
                  className={`flex items-center gap-1 py-2 px-3 focus:outline-none transition-colors cursor-pointer ${
                    isOpen
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => handleDropdown(item.toLowerCase())}
                >
                  {item}
                  <Chevron up={isOpen} active={isOpen} />
                </button>

                {isOpen && (
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full md:mt-2 min-w-[220px] bg-gray-800 rounded-lg shadow-lg py-2 z-20">
                    <ul className="flex flex-col text-left">
                      {item === "Tentang" && (
                        <>
                          <li>
                            <Link
                              to="/tentang/sejarah"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Sejarah & Visi Misi
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/tentang/program"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Program & Kegiatan
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/tentang/struktur"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Struktur Organisasi
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/tentang/pegawai"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Profile Pegawai
                            </Link>
                          </li>
                        </>
                      )}
                      {item === "Berita" && (
                        <>
                          <li>
                            <Link
                              to="/berita/artikel"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Artikel
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/berita/video"
                              className="px-5 py-2 text-gray-100 hover:bg-gray-700 block"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              Video
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={item}>
                <NavLink
                  to={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `py-2 px-3 transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                  end={item === "Beranda"}
                >
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-300 shadow-lg">
            <ul className="flex flex-col font-medium text-gray-700">
              {[
                "Beranda",
                "Tentang",
                "Berita",
                "Dokumen",
                "Layanan",
                "Kontak",
                "FAQ",
              ].map((item) => {
                const isDropdown = item === "Tentang" || item === "Berita";
                const isOpen = openDropdown === item.toLowerCase();

                return isDropdown ? (
                  <li
                    key={item}
                    className="relative border-b border-gray-200"
                    ref={isOpen ? dropdownRef : null}
                  >
                    <button
                      className={`flex items-center justify-between w-full px-4 py-2 focus:outline-none transition-colors cursor-pointer ${
                        isOpen
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-700"
                      }`}
                      onClick={() => handleDropdown(item.toLowerCase())}
                    >
                      {item}
                      <Chevron up={isOpen} active={isOpen} />
                    </button>

                    {isOpen && (
                      <div className="relative w-full bg-gray-200 py-2 z-20">
                        <ul className="flex flex-col text-left">
                          {item === "Tentang" && (
                            <>
                              <li>
                                <Link
                                  to="/tentang/sejarah"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Sejarah & Visi Misi
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/tentang/program"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Program & Kegiatan
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/tentang/struktur"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Struktur Organisasi
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/tentang/pegawai"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Profile Pegawai
                                </Link>
                              </li>
                            </>
                          )}
                          {item === "Berita" && (
                            <>
                              <li>
                                <Link
                                  to="/berita/artikel"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Artikel
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/berita/video"
                                  className="px-8 py-2 text-gray-700 hover:bg-gray-300 block"
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                >
                                  Video
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item} className="px-4 py-2 border-b border-gray-200">
                    <NavLink
                      to={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold block"
                          : "text-gray-700 hover:text-blue-600 block"
                      }
                      end={item === "Beranda"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-300 mt-0 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img
              src="/src/assets/logodiskominfosantik.png"
              alt="Logo Diskominfo"
              className="h-10 w-10"
            />
            <span className="font-bold text-lg text-blue-700">
              Diskominfosantik
            </span>
          </div>
          <span className="text-gray-600 text-xs text-center md:text-left">
            Dinas Komunikasi, Informatika, Persandian dan Statistik Kabupaten
            Bekasi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center md:items-start mt-6 md:mt-0">
          <a
            href="https://instagram.com/bekasikab_diskominfosantik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <FaInstagram className="text-[#E4405F] text-xl" />
            <span>@bekasikab_diskominfosantik</span>
          </a>
          <a
            href="https://twitter.com/bekasikab_kominfosanitik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <FaXTwitter className="text-black text-xl" />
            <span>@bekasikab_kominfosanitik</span>
          </a>
          <a
            href="https://youtube.com/channel/UCxxxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <FaYoutube className="text-[#FF0000] text-xl" />
            <span>WibawamukutiTV-Geber-Terus</span>
          </a>
          <a
            href="https://facebook.com/DiskominfosantikKabupatenBekasi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <FaFacebook className="text-[#1877F3] text-xl" />
            <span>DiskominfosantikKabupatenBekasi</span>
          </a>
          <a
            href="https://tiktok.com/@wibawamukutitv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <FaTiktok className="text-[#000000] text-xl" />
            <span>@wibawamukutitv</span>
          </a>
          <a
            href="mailto:wibawamukutitv@gmail.com"
            className="flex items-center gap-2 justify-center sm:justify-start"
          >
            <span className="relative flex items-center">
              <FaEnvelope className="text-white text-xl" />
              <span
                className="absolute -top-1 -right-2 w-3 h-3 rounded-full bg-red-600 border-2 border-white"
                title="Email"
              />
            </span>
            <span>wibawamukutitv@gmail.com</span>
          </a>
        </div>

        <div className="flex flex-col h-full justify-end items-center md:items-end mt-6 md:mt-0">
          <span className="text-gray-500 mt-auto text-center md:text-right">
            &copy; 2025 Diskominfo Kabupaten Bekasi
          </span>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  const location = useLocation();
  const [latestArticles, setLatestArticles] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [errorLatest, setErrorLatest] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLoadingLatest(true);
        const response = await axios.get(`${API_URL}/terbaru`);
        setLatestArticles(response.data);
      } catch (err) {
        setErrorLatest("Failed to fetch latest articles.");
        console.error("Error fetching latest articles:", err);
      } finally {
        setLoadingLatest(false);
      }
    };
    fetchLatestArticles();
  }, []);

  return (
    <div className="font-sans bg-white min-h-screen flex flex-col relative">
      <Header />
      <div className="flex-1 pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section
                  className="relative min-h-[800px] flex items-center justify-start"
                  style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 container mx-auto px-8">
                    <div className="max-w-2xl">
                      <h1 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
                        Mendorong Inovasi Melalui Transformasi dan Digitalisasi
                      </h1>
                    </div>
                  </div>
                </section>

                {/* Profil Section */}
                <section className="container mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 w-full flex justify-center">
                    <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/WwsbI3K-dmY"
                        title="Company Profile Diskominfosantik"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl font-bold text-blue-800 mb-3">
                      DINAS KOMUNIKASI INFORMATIKA
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Dinas Komunikasi Informatika Kabupaten Bekasi menjadi
                      garda terdepan transformasi digital daerah. Dinas ini
                      mengelola informasi publik, infrastruktur teknologi, dan
                      sistem pemerintahan berbasis elektronik (SPBE) untuk
                      mewujudkan layanan yang efisien dan transparan. Selain
                      itu, melalui inisiatif Satu Data dan aplikasi digital
                      seperti BEKASIE, Diskominfosantik memperkuat interaksi
                      masyarakat dengan pemerintah serta mendukung kemajuan
                      Kabupaten Bekasi.
                    </p>
                  </div>
                </section>

                {/* Berita Section */}
                <section className="bg-gray-50 py-12">
                  <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold text-blue-900 mb-8">
                      BERITA TERBARU
                    </h3>

                    {loadingLatest ? (
                      <p className="text-center text-gray-600">
                        Loading latest articles...
                      </p>
                    ) : errorLatest ? (
                      <p className="text-center text-red-600">{errorLatest}</p>
                    ) : latestArticles.length === 0 ? (
                      <p className="text-center text-gray-600">
                        No latest articles found.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {latestArticles[0] && (
                          <Link
                            to={`/berita/${latestArticles[0].id}`}
                            className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <div className="h-64 bg-gray-200 relative">
                              {latestArticles[0].gambar_path ? (
                                <img
                                  src={getImageUrl(
                                    latestArticles[0].gambar_path
                                  )}
                                  alt={latestArticles[0].judul}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <span className="text-gray-500">
                                    GAMBAR BERITA
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <h4 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                                {latestArticles[0].judul}
                              </h4>
                              <span className="text-gray-500 text-sm">
                                {new Date(
                                  latestArticles[0].uploaded_at
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                              <p className="mt-4 text-gray-600">
                                {latestArticles[0].isi.substring(0, 100) +
                                  "..."}
                              </p>
                            </div>
                          </Link>
                        )}

                        <div className="md:col-span-2 space-y-6">
                          {latestArticles.slice(1, 5).map((article) => (
                            <Link
                              key={article.id}
                              to={`/berita/${article.id}`}
                              className="bg-white rounded-xl shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow"
                            >
                              <div className="w-32 h-24 bg-gray-200 rounded-lg shrink-0">
                                {article.gambar_path ? (
                                  <img
                                    src={getImageUrl(article.gambar_path)}
                                    alt={article.judul}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">
                                      GAMBAR
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col justify-between">
                                <div>
                                  <h5 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                    {article.judul}
                                  </h5>
                                  <span className="text-gray-500 text-sm">
                                    {new Date(
                                      article.uploaded_at
                                    ).toLocaleDateString("id-ID", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                                  {article.isi.substring(0, 100) + "..."}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            }
          />
          <Route path="/tentang/sejarah" element={<TentangSejarah />} />
          <Route path="/tentang/program" element={<TentangProgram />} />
          <Route path="/tentang/struktur" element={<TentangStruktur />} />
          <Route path="/tentang/pegawai" element={<TentangPegawai />} />
          <Route path="/berita/artikel" element={<BeritaArtikel />} />
          <Route path="/berita/video" element={<BeritaVideo />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/dokumen" element={<Dokumen />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
