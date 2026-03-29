import React, { useEffect } from "react";
import ServiceCard from "./components/ServiceCard";
import { FaDesktop, FaEnvelope, FaCloud, FaSitemap, FaGlobe, FaServer, FaWifi, FaLock } from 'react-icons/fa'

const services = [
	{
		title: "JARINGAN INTRA PEMERINTAH DAERAH",
		description:
			"Memberikan dukungan dalam pemasangan jaringan LAN dan WiFi di lingkungan pemerintah daerah serta penanganan pengaduan terkait kendala jaringan.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/sub-domain",
		icon: <FaWifi className="text-blue-700 text-4xl" />,
	},
	{
		title: "APLIKASI",
		description:
			"Menyediakan layanan pengembangan aplikasi yang dibutuhkan instansi pemerintah dan menerima laporan kendala yang terjadi pada aplikasi.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/aplikasi",
		icon: <FaDesktop className="text-blue-700 text-4xl" />,
	},
	{
		title: "DATA CENTER",
		description:
			"Menyediakan fasilitas Co-Location Server (penempatan server instansi di data center pemerintah) serta layanan pengaduan jika terjadi kendala server.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/cloud",
		icon: <FaServer className="text-blue-700 text-4xl" />,
	},
	{
		title: "VIRTUAL MACHINE / PRIVATE SERVER",
		description:
			"Menyediakan pembuatan Virtual Machine / Private Server untuk kebutuhan komputasi instansi serta penanganan pengaduan bila terjadi masalah pada layanan tersebut.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/sub-domain",
		icon: <FaGlobe className="text-blue-700 text-4xl" />,
	},
	{
		title: "SUBDOMAIN",
		description:
			"Memberikan layanan penyediaan subdomain resmi pada domain bekasikab.go.id untuk instansi pemerintah daerah.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/sub-domain",
		icon: <FaSitemap className="text-blue-700 text-4xl" />,
	},
	{
		title: "E-MAIL / CLOUD",
		description:
			"Menyediakan pembuatan akun e-mail dan cloud resmi pemerintah daerah serta layanan pengaduan jika ada kendala penggunaannya.",
		link: "https://baba.bekasikab.go.id/layanan/kategori/e-mail",
		icon: <FaEnvelope className="text-blue-700 text-3xl" />,
	},
];

export default function Layanan() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Hero Banner */}
			<div className="relative w-full h-[400px] flex items-center bg-fixed">
				<img
					src="/src/assets/Header_Image.png"
					alt="Hero Banner"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/30" /> {}
				<div className="relative z-10 container mx-auto px-8">
					<h1 className="text-white font-black text-5xl md:text-6xl tracking-wide text-left drop-shadow-lg">
						LAYANAN
					</h1>
				</div>
			</div>

			{/* Grid Layanan */}
			<div className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
					{services.map((service, idx) => (
						<ServiceCard
							key={idx}
							title={service.title}
							description={service.description}
							link={service.link}
							icon={service.icon}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

